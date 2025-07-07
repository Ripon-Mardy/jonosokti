"use client";
import { useState, useEffect } from "react";
import { Phone, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [timer, setTimer] = useState(120);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter()

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) setPhone(value);
  };

  const requestOtp = async () => {
    const isValid = /^01[3-9]\d{8}$/.test(phone);
    if (!isValid) return alert("Invalid phone number");

    setIsLoading(true);
    try {
      const res = await fetch(`${apiKey}/user-auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        alert("Failed to send OTP");
        return;
      }

      setIsOtpSent(true);
      setOtp(["", "", "", "", "", ""]);
      setTimer(120);
    } catch (err) {
      console.error("OTP Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);
      if (value && index < 5) document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const verifyOtp = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) return;

    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${apiKey}/user-auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp: fullOtp }),
      });

      if (!res.ok) {
        setErrorMessage("OTP not matched. Please try again.");
        return;
      }

      const result = await res.json();
      console.log('result', result)

      // Assuming result.success = true on success
      if (result.status === true) {
        setIsVerified(true);
        router.push('/registration-form')
        
      } else {
        setErrorMessage("OTP not matched. Please try again.");
      }
    } catch (err) {
      console.error("Verify error:", err);
      setErrorMessage("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOtpSent || timer <= 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, isOtpSent]);

  return (
    <div className="xl:container xl:mx-auto pt-28 bg-gray-50 flex items-center justify-center px-4 flex-col pb-20">
      <h2 className="text-2xl font-bold mb-2 text-center">
        {isVerified
          ? "Welcome, Registration Successful"
          : isOtpSent
          ? "OTP Verification"
          : "Phone Verification"}
      </h2>

      <p className="text-sm text-center text-gray-600 mb-6">
        {isVerified
          ? "You have successfully verified your phone number."
          : isOtpSent
          ? "Enter the verification code sent to your phone"
          : "We’ll send a code to your phone"}
      </p>

      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        {!isOtpSent && !isVerified && (
          <>
            <div className="relative mb-4">
              <Phone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full pl-10 pr-3 outline-none py-3 focus:ring-1 focus:border-blue-500 rounded-md"
                placeholder="01XXXXXXXXX"
              />
            </div>
            <button
              onClick={requestOtp}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {isOtpSent && !isVerified && (
          <>
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-10 text-center outline-none border border-gray-300 focus:border-blue-500 focus:ring-1 rounded"
                />
              ))}
            </div>
            <button
              onClick={verifyOtp}
              disabled={isLoading || otp.join("").length !== 6}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            {errorMessage && (
              <p className="text-red-500 text-sm mt-2 text-center">{errorMessage}</p>
            )}

            <p className="text-center mt-3 text-sm text-gray-500">
              {timer > 0 ? (
                <span className="flex items-center justify-center gap-1">
                  <Clock size={16} /> Resend code in {timer}s
                </span>
              ) : (
                <button onClick={requestOtp} className="text-blue-500 underline">
                  Resend Code
                </button>
              )}
            </p>
          </>
        )}

        {/* {isVerified && (
          <div className="text-center text-green-600 font-medium mt-4">
            🎉 Your phone number has been verified!
          </div>
        )} */}


        
      </div>
    </div>
  );
}
