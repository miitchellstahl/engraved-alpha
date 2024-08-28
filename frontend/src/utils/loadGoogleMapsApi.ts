export const loadGoogleMapsApi = (apiKey: string) => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;

    if (document.getElementById("google-maps-script")) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.id = "google-maps-script";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = (error) => reject(error);
    document.head.appendChild(script);
  });
};
