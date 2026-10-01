"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, X, MessageCircle } from "lucide-react";

type FormData = {
  name: string;
  mobile: string;
  email: string;
  message: string;
};

type FieldErrors = {
  name?: string;
  mobile?: string;
  email?: string;
  message?: string;
};

export default function FloatingContactForm() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors: FieldErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      errors.name = "Full name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Enter a valid email address";
      isValid = false;
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
      isValid = false;
    } else if (!mobileRegex.test(formData.mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number";
      isValid = false;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message should be at least 10 characters";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setSubmitError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxBFjT-CHS2e1hpBqn_KxiA0AXB8co0aLhb8yuLqNBH9nH885y8sCDALOBBtFw36H7m5w/exec",
        {
          method: "POST",
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (data.success) {
        setSuccess("Thank you for reaching out! We will get back to you soon.");
        setFormData({ name: "", email: "", mobile: "", message: "" });
      } else {
        setSubmitError("Something went wrong");
      }
    } catch (err) {
      setSubmitError("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const morphTransition = {
    type: "spring",
    bounce: 0.05,
    duration: 0.45,
  };

  return (
    <>
      {/* FLOATING ACTIONS */}
      <div className="fixed right-5 bottom-5 z-47 flex flex-col items-end gap-3 md:right-8 md:bottom-8">
        {/* WHATSAPP */}
        <a
          href="https://wa.me/6300380596"
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform duration-300 hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .16 5.34.16 11.91c0 2.1.55 4.16 1.6 5.98L0 24l6.28-1.65a11.9 11.9 0 0 0 5.79 1.48h.01c6.57 0 11.91-5.34 11.91-11.91 0-3.18-1.24-6.17-3.47-8.44ZM12.08 21.8h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.85 9.85 0 0 1-1.52-5.27c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.99 2.91a9.82 9.82 0 0 1 2.9 6.99c0 5.46-4.44 9.89-9.9 9.89Zm5.43-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.38-1.48-.88-.79-1.47-1.77-1.64-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.89 1.23 3.09.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          </svg>
        </a>

        {/* MESSAGE */}
        <button
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-2xl transition-transform duration-300 hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      </div>

      {/* FORM */}
      {open && (
        <>
          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-999 bg-black/30 backdrop-blur-sm"
          />

          {/* FORM CARD */}
          <div className="fixed right-4 bottom-4 z-999 max-h-[85vh] w-[92%] max-w-md overflow-y-auto rounded-3xl border border-black/10 bg-white p-5 shadow-[0_20px_80px_rgba(0,0,0,0.18)] sm:right-6 sm:bottom-6 sm:p-6">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-black">Let’s Talk</h3>

                <p className="mt-1 text-sm text-black/50">
                  Tell us about your project
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 transition-all hover:bg-black hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* KEEP YOUR EXISTING FORM HERE */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:h-14 sm:rounded-2xl sm:px-5 ${
                      fieldErrors.name ? "border-red-500" : "border-black/10"
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setFormData((prev) => ({ ...prev, mobile: value }));
                        setFieldErrors((prev) => ({ ...prev, mobile: "" }));
                      }
                    }}
                    inputMode="numeric"
                    placeholder="9876543210"
                    className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:h-14 sm:rounded-2xl sm:px-5 ${
                      fieldErrors.mobile ? "border-red-500" : "border-black/10"
                    }`}
                  />
                  {fieldErrors.mobile && (
                    <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                      {fieldErrors.mobile}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`h-12 w-full rounded-xl border bg-[#f8f8f8] px-4 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:h-14 sm:rounded-2xl sm:px-5 ${
                    fieldErrors.email ? "border-red-500" : "border-black/10"
                  }`}
                />
                {fieldErrors.email && (
                  <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-black/70 sm:mb-3 sm:text-sm">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className={`w-full resize-none rounded-xl border bg-[#f8f8f8] px-4 py-3 text-sm text-black transition-colors duration-300 outline-none placeholder:text-black/30 focus:border-black focus:bg-white sm:rounded-2xl sm:px-5 sm:py-4 ${
                    fieldErrors.message ? "border-red-500" : "border-black/10"
                  }`}
                />
                {fieldErrors.message && (
                  <p className="mt-1.5 text-xs text-red-500 sm:mt-2 sm:text-sm">
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-12 w-full items-center justify-between rounded-xl bg-black px-5 text-white shadow-lg transition-all duration-300 hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-70 sm:h-14 sm:rounded-2xl sm:px-6"
              >
                <span className="text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm">
                  {loading ? "Sending..." : "Send Message"}
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 sm:h-10 sm:w-10">
                  <ArrowUpRight size={18} className="scale-75 sm:scale-100" />
                </div>
              </button>

              {success && (
                <p className="mt-2 text-sm font-medium text-green-600">
                  {success}
                </p>
              )}

              {submitError && (
                <p className="mt-2 text-sm font-medium text-red-500">
                  {submitError}
                </p>
              )}
            </form>
          </div>
        </>
      )}
    </>
  );
}
