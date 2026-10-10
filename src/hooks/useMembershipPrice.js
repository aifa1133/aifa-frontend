import { useState, useEffect } from "react";

let _cache = null;
let _promise = null;

function fetchPrice() {
  if (_promise) return _promise;
  _promise = fetch("/api/settings/membership-price")
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(d => { _cache = d; return d; })
    .catch(() => { _cache = { price: 6999, originalPrice: 15000 }; return _cache; });
  return _promise;
}

export function useMembershipPrice() {
  const [data, setData] = useState(_cache || { price: 6999, originalPrice: 15000 });
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    if (_cache) { setData(_cache); setLoading(false); return; }
    fetchPrice().then(d => { setData(d); setLoading(false); });
  }, []);

  return { ...data, loading };
}

export function invalidateMembershipPriceCache() {
  _cache = null;
  _promise = null;
}
