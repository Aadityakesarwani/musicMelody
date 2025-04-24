import React, { useState } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [channels, setChannels] = useState({ youtube: "", instagram: "", other: "" });
  const [errors, setErrors] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const validateLinks = () => {
    const newErrors = {};
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w]{2,}(\/\S*)?$/;
    Object.entries(channels).forEach(([key, value]) => {
      if (value && !urlPattern.test(value)) {
        newErrors[key] = "Please enter a valid URL";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChannels((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-10 p-4 md:p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold">Pricing</h2>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Plans</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl shadow">
            <h4 className="text-lg font-bold">Subscription</h4>
            <p className="text-sm text-gray-600 mt-2">
              Recommended for creators who make 2+ videos/month
            </p>

            <div className="flex justify-start my-4">
              <div className="flex items-center bg-purple-100 p-1 rounded-full">
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isYearly ? "bg-white text-purple-600 shadow" : "text-gray-600"
                  }`}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </button>
                <button
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    isYearly ? "bg-white text-purple-600 shadow" : "text-gray-600"
                  }`}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly
                </button>
              </div>
            </div>

            <ul className="mt-2 text-sm text-gray-700 space-y-1 list-disc list-inside">
              {isYearly ? (
                <>
                  <li>$10 per month ($120/year)</li>
                  <li>Save 20% with yearly billing</li>
                </>
              ) : (
                <li>$10 per month</li>
              )}
            </ul>
            <div className="mt-4 text-sm">
              <h5 className="font-semibold mb-2">All the features Plus</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>15 min of monthly downloads</li>
                <li>License for downloaded music</li>
                <li>Access to stem downloads</li>
                <li>Access to newest features</li>
              </ul>
            </div>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded shadow">
              Get started
            </button>
          </div>

          <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl shadow">
            <h4 className="text-lg font-bold">Credits</h4>
            <p className="text-sm text-gray-600 mt-2">
              Good for individuals and creators who need music once in a while
            </p>
            <ul className="mt-4 text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>1 minute = $3 / min</li>
              <li>Credits don’t expire</li>
            </ul>
            <div className="mt-4 text-sm">
              <h5 className="font-semibold mb-2">All the features Plus</h5>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>License for downloaded music</li>
                <li>Access to stem downloads</li>
                <li>Access to newest features</li>
              </ul>
            </div>
            <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded shadow">
              Buy Credits for $3
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Channels</h3>
        <p className="text-sm text-gray-600">
          Please add links to all the places where you will use music created from Music Melody. It helps us
          manage copyright correctly.
        </p>
        <div className="space-y-3">
          {['youtube', 'instagram', 'other'].map((platform) => (
            <div key={platform}>
              <label className="block capitalize text-sm font-medium mb-1">{platform}</label>
              <input
                name={platform}
                value={channels[platform]}
                onChange={handleInputChange}
                type="url"
                placeholder={`Enter ${platform} link here`}
                className={`w-full p-2 border rounded-md ${
                  errors[platform] ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors[platform] && (
                <p className="text-xs text-red-500 mt-1">{errors[platform]}</p>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={validateLinks}
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded"
        >
          Save Channels
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-red-600">Delete Account</h3>
        <p className="text-sm text-gray-600">
          This action cannot be undone. You will lose all projects and data associated with it.
        </p>
        {!deleteConfirm ? (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => setDeleteConfirm(true)}
          >
            Delete Account
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-red-500">Are you sure? Click below to confirm deletion.</p>
            <button className="px-4 py-2 bg-red-700 text-white rounded">Confirm Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
