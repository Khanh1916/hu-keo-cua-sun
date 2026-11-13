/*
 * Hũ Kẹo Của Sún - Real-time Weather & Location Caring Engine
 * Free API: Open-Meteo & Nominatim (Zero paid APIs, 100% Free)
 * Caring messages tailored specifically for Ngọc (Khánh in Hà Nội -> Ngọc in Hải Phòng)
 */
window.WeatherEngine = (() => {
  // Reference coordinates for Hải Phòng (Ngọc's home) & Hà Nội (Khánh)
  const HAI_PHONG = { lat: 20.8449, lon: 106.6881, name: "Hải Phòng" };
  const HA_NOI = { lat: 21.0285, lon: 105.8542, name: "Hà Nội" };

  const STORAGE_KEY = "hukeo_weather_data";

  // WMO Weather interpretation table (Vietnamese)
  const WMO_CODES = {
    0: { text: "Trời nắng đẹp", icon: "☀️", rain: false },
    1: { text: "Nắng nhẹ, ít mây", icon: "🌤️", rain: false },
    2: { text: "Mây rải rác", icon: "⛅", rain: false },
    3: { text: "Nhiều mây, âm u", icon: "☁️", rain: false },
    45: { text: "Có sương mù", icon: "🌫️", rain: false },
    48: { text: "Sương mù lạnh", icon: "🌫️", rain: false },
    51: { text: "Mưa phùn lất phất", icon: "🌦️", rain: true },
    53: { text: "Mưa phùn vừa", icon: "🌦️", rain: true },
    55: { text: "Mưa phùn dày", icon: "🌧️", rain: true },
    61: { text: "Mưa nhỏ", icon: "🌧️", rain: true },
    63: { text: "Trời đang mưa vừa", icon: "🌧️", rain: true },
    65: { text: "Mưa rào lớn", icon: "🌧️", rain: true },
    80: { text: "Mưa rào ngắt quãng", icon: "🌦️", rain: true },
    81: { text: "Mưa rào rải rác", icon: "🌧️", rain: true },
    82: { text: "Mưa rào to", icon: "⛈️", rain: true },
    95: { text: "Mưa dông sấm sét", icon: "⛈️", rain: true },
    96: { text: "Dông kèm mưa đá", icon: "⛈️", rain: true }
  };

  // Known Vietnam cities for offline/fast distance matching
  const CITIES = [
    { name: "Hải Phòng", lat: 20.8449, lon: 106.6881 },
    { name: "Hà Nội", lat: 21.0285, lon: 105.8542 },
    { name: "Quảng Ninh (Hạ Long)", lat: 20.9505, lon: 107.0734 },
    { name: "Hải Dương", lat: 20.9373, lon: 106.3146 },
    { name: "Thái Bình", lat: 20.4463, lon: 106.3366 },
    { name: "Hưng Yên", lat: 20.6560, lon: 106.0512 },
    { name: "Nam Định", lat: 20.4200, lon: 106.1683 },
    { name: "Bắc Ninh", lat: 21.1861, lon: 106.0763 },
    { name: "Bắc Giang", lat: 21.2731, lon: 106.1946 },
    { name: "Ninh Bình", lat: 20.2506, lon: 105.9745 },
    { name: "Thanh Hóa", lat: 19.8067, lon: 105.7852 },
    { name: "Đà Nẵng", lat: 16.0544, lon: 108.2022 },
    { name: "Huế", lat: 16.4637, lon: 107.5909 },
    { name: "Nha Trang", lat: 12.2388, lon: 109.1967 },
    { name: "Đà Lạt", lat: 11.9404, lon: 108.4583 },
    { name: "TP. Hồ Chí Minh", lat: 10.8231, lon: 106.6297 }
  ];

  let currentWeather = null;
  let listeners = [];

  // Haversine distance formula in kilometers
  function getDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  }

  function findClosestCity(lat, lon) {
    let closest = CITIES[0];
    let minD = Infinity;
    for (const city of CITIES) {
      const d = getDistanceKm(lat, lon, city.lat, city.lon);
      if (d < minD) {
        minD = d;
        closest = city;
      }
    }
    return { name: closest.name, distanceKm: minD };
  }

  // Generate genuine, loving dialogue from Anh Khánh based on weather & location
  function generateCaringMessage({ city, temp, feelsLike, weatherText, isRaining, isAway, distFromHp }) {
    // 1. If Ngọc is traveling / away from Hải Phòng (> 35km)
    if (isAway) {
      if (city.includes("Hà Nội")) {
        return [
          `Ơ em iu đang ở Hà Nội hả? Qua anh đón đi ăn phở hay đi lượn phố không em iu ơi! 🥰`,
          `Em lên Hà Nội có việc gì thế? Cần anh chạy qua đón không, nhớ nhắn tin cho anh nha!`
        ];
      }
      return [
        `Ủa hôm nay em đi đâu xa khỏi Hải Phòng thế này (${city})? Đi đường nhớ chú ý xe cộ, đi đứng cẩn thận giữ an toàn nha em iu!`,
        `Tới ${city} rồi nhớ nhắn tin cho anh biết tới nơi an toàn nha sọ dừa, đừng làm anh lo đấy.`,
        `Hôm nay đi xa nè, lúc nào xong việc về nhớ đi chậm thôi nha em, đừng phóng nhanh.`
      ];
    }

    // 2. If in Hải Phòng: customized by real-time weather & temperature
    if (isRaining) {
      return [
        `Hải Phòng đang mưa này em ơi 🌧️ Ra đường nhớ mang áo mưa, đường Đất Cảng trơn trượt nhớ đi chậm giữ an toàn nha em!`,
        `Trời mưa gió thế này em đi đứng cẩn thận, về tới nhà nhớ nhắn anh một câu nha sọ dừa.`,
        `Mưa thế này mà ở nhà nằm đắp chăn ôm mèo Bông là sướng nhất, em đi làm về sớm nha.`
      ];
    }

    if (temp <= 16) {
      return [
        `Hải Phòng hôm nay rét đậm lắm (${temp}°C) đấy! Em Ngọc nhớ mặc áo phao dày, quàng khăn ấm vào nha, đi xe gió lùa buốt tai đấy!`,
        `Trời lạnh thế này em nhớ uống nước ấm, đừng tắm muộn nha em iu.`,
        `Gió mùa về Hải Phòng rồi, ra ngoài nhớ giữ ấm cổ họng đừng để bị ho nha.`
      ];
    }

    if (temp <= 22) {
      return [
        `Thời tiết Hải Phòng hôm nay se se lạnh (${temp}°C) thích ghê! Ra đường nhớ khoác thêm áo ấm mỏng nha em.`,
        `Hôm nay trời mát lạnh dễ chịu, em đi làm nhớ ăn sáng đầy đủ đừng nhịn đói nha.`,
        `Trời này tối lượn ăn bánh mì cay chấm tương ớt cay nồng là hết sảy nè em!`
      ];
    }

    if (temp >= 32) {
      return [
        `Hải Phòng hôm nay nắng to gắt (${temp}°C) ghê! Em ra đường nhớ che chắn kỹ, bôi kem chống nắng với uống nhiều nước nha.`,
        `Trời nắng nóng thế này đi làm về sớm nghỉ ngơi, đừng phơi nắng nhiều mệt đấy em iu.`,
        `Nắng này chiều rủ bạn làm cốc dừa dầm mát lạnh giải nhiệt đi em!`
      ];
    }

    // 23 - 31°C: pleasant comfortable weather
    return [
      `Thời tiết Hải Phòng hôm nay mát mẻ dễ chịu cực (${temp}°C)! Đi làm về có ghé Cing House làm cốc trà cúc không em?`,
      `Hôm nay trời đẹp nè em iu, chúc em một ngày làm việc thật vui vẻ, bớt suy nghĩ linh tinh nha!`,
      `Trời đẹp thế này nhớ anh thì mở app vào bấm anh mấy cái cho đỡ nhớ nha 🥰`
    ];
  }

  // Fetch live weather from Open-Meteo
  async function fetchForecast(lat, lon, cityName = null) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FBangkok`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Weather API error");
      const data = await res.json();

      const current = data.current || {};
      const daily = data.daily || {};
      const code = current.weather_code || 0;
      const wmo = WMO_CODES[code] || { text: "Trời quang", icon: "🌤️", rain: false };

      const distFromHp = getDistanceKm(lat, lon, HAI_PHONG.lat, HAI_PHONG.lon);
      const isAway = distFromHp > 35;

      let resolvedCity = cityName;
      if (!resolvedCity) {
        if (!isAway) {
          resolvedCity = "Hải Phòng";
        } else {
          const match = findClosestCity(lat, lon);
          resolvedCity = match.name;
        }
      }

      const temp = Math.round(current.temperature_2m ?? 24);
      const feelsLike = Math.round(current.apparent_temperature ?? temp);
      const tempMax = Math.round((daily.temperature_2m_max && daily.temperature_2m_max[0]) ?? temp);
      const tempMin = Math.round((daily.temperature_2m_min && daily.temperature_2m_min[0]) ?? temp);
      const isRaining = Boolean(wmo.rain || (current.rain && current.rain > 0.1) || (current.precipitation && current.precipitation > 0.1));

      const messages = generateCaringMessage({
        city: resolvedCity,
        temp,
        feelsLike,
        weatherText: wmo.text,
        isRaining,
        isAway,
        distFromHp
      });

      const message = messages[Math.floor(Math.random() * messages.length)];

      currentWeather = {
        lat,
        lon,
        city: resolvedCity,
        isAway,
        distFromHp,
        temp,
        feelsLike,
        tempMax,
        tempMin,
        humidity: current.relative_humidity_2m,
        weatherCode: code,
        weatherText: wmo.text,
        icon: wmo.icon,
        isDay: current.is_day === 1,
        isRaining,
        caringMessage: message,
        updatedAt: Date.now()
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentWeather));
      } catch {
        // ignore
      }

      notifyListeners();
      return currentWeather;
    } catch (err) {
      console.warn("Weather fetch fallback:", err);
      return loadCachedOrFallback();
    }
  }

  function loadCachedOrFallback() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        currentWeather = JSON.parse(saved);
        notifyListeners();
        return currentWeather;
      }
    } catch {
      // ignore
    }

    // Default fallback: Hai Phong cozy weather
    currentWeather = {
      lat: HAI_PHONG.lat,
      lon: HAI_PHONG.lon,
      city: "Hải Phòng",
      isAway: false,
      distFromHp: 0,
      temp: 24,
      feelsLike: 25,
      tempMax: 26,
      tempMin: 20,
      humidity: 75,
      weatherCode: 1,
      weatherText: "Nắng nhẹ, mát mẻ",
      icon: "🌤️",
      isDay: true,
      isRaining: false,
      caringMessage: "Hôm nay thời tiết Hải Phòng mát mẻ dễ chịu, em Ngọc đi làm nhớ mặc áo khoác mỏng nha!",
      updatedAt: Date.now()
    };
    notifyListeners();
    return currentWeather;
  }

  // Request actual user location with graceful fallback
  function requestLocation(onSuccess, onError) {
    if (!navigator.geolocation) {
      if (onError) onError("Trình duyệt không hỗ trợ định vị");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let cityName = null;
        try {
          // Optional reverse geocoding via Nominatim with 3.5s timeout
          const ctrl = new AbortController();
          const tid = setTimeout(() => ctrl.abort(), 3500);
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=vi`,
            { signal: ctrl.signal, headers: { "User-Agent": "HuKeoCuaSun-App/1.0" } }
          );
          clearTimeout(tid);
          if (geoRes.ok) {
            const geo = await geoRes.json();
            const addr = geo.address || {};
            cityName = addr.city || addr.state || addr.province || addr.county || null;
            if (cityName) {
              cityName = cityName.replace(/Thành phố\s*/i, "").replace(/Tỉnh\s*/i, "");
            }
          }
        } catch {
          // Fall back to closest city table
        }

        const weather = await fetchForecast(latitude, longitude, cityName);
        if (onSuccess) onSuccess(weather);
      },
      (err) => {
        // If user denies or error, default to Hai Phong coordinates
        fetchForecast(HAI_PHONG.lat, HAI_PHONG.lon, "Hải Phòng");
        if (onError) onError(err.message);
      },
      { timeout: 10000, maximumAge: 300000, enableHighAccuracy: false }
    );
  }

  // Automatic silent background geolocation check (no button click needed!)
  let lastAutoCheckTime = 0;
  function tryAutoLocate(force = false) {
    if (!navigator.geolocation) return;
    const now = Date.now();
    // Throttle automatic checks to once every 3 minutes unless forced
    if (!force && now - lastAutoCheckTime < 180000) return;
    lastAutoCheckTime = now;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let cityName = null;
        try {
          const ctrl = new AbortController();
          const tid = setTimeout(() => ctrl.abort(), 3500);
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=vi`,
            { signal: ctrl.signal, headers: { "User-Agent": "HuKeoCuaSun-App/1.0" } }
          );
          clearTimeout(tid);
          if (geoRes.ok) {
            const geo = await geoRes.json();
            const addr = geo.address || {};
            cityName = addr.city || addr.state || addr.province || addr.county || null;
            if (cityName) {
              cityName = cityName.replace(/Thành phố\s*/i, "").replace(/Tỉnh\s*/i, "");
            }
          }
        } catch {
          // Fallback to distance matching
        }
        await fetchForecast(latitude, longitude, cityName);
      },
      () => {
        // Silently keep using cached or Hai Phong weather
      },
      { timeout: 10000, maximumAge: 300000, enableHighAccuracy: false }
    );
  }

  function notifyListeners() {
    listeners.forEach((fn) => {
      try {
        fn(currentWeather);
      } catch (e) {
        console.error(e);
      }
    });
  }

  function init() {
    loadCachedOrFallback();
    // 1. Immediately fetch latest weather for cached coords or default Hai Phong
    fetchForecast(
      currentWeather ? currentWeather.lat : HAI_PHONG.lat,
      currentWeather ? currentWeather.lon : HAI_PHONG.lon,
      currentWeather ? currentWeather.city : "Hải Phòng"
    );
    // 2. Automatically try real GPS location in background (no click required!)
    tryAutoLocate();
  }

  return {
    init,
    tryAutoLocate,
    getWeather: () => currentWeather,
    fetchForecast,
    requestLocation,
    onWeatherChange: (fn) => listeners.push(fn),
    HAI_PHONG,
    HA_NOI
  };
})();
