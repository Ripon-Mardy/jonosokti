"use client";
import { useState, useEffect } from "react";
import { Phone, ArrowRight, Clock, Shield } from 'lucide-react';

export default function Page() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // api key 
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setPhone(value);
    }
  };

  const requestOtp = async () => {
    if (phone.length === 11 && /^01[3-9]\d{8}$/.test(phone)) {
      setIsLoading(true);
      try {
        // Simulate API call

        const res = await fetch(`${apiKey}/user-auth/send-otp`,{
          method : 'POST',
          headers : {
            'content-type' : 'application/json',
          },
          body : JSON.stringify({phone : phone})
        })

        if(!res.ok) throw new Error('failed to response');
        const data = await res.json();
        console.log('data', data)




        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsOtpSent(true);
        setIsResendDisabled(true);
        setTimer(120);
      } catch (error) {
        console.error('Error sending OTP:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please enter a valid Bangladesh phone number.");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const verifyOtp = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 4) {
      setIsLoading(true);
      try {
        // Simulate API call

        const res = await fetch(`${apiKey}/user-auth/verify-otp`, {
          method : 'POST',
          headers : {
            'content-type' : 'application/json',
          },
          body : JSON.stringify({phone, otp})
        })

        if(!res.ok) throw new Error('failed to send OTP');
        const data = await res.json();
        console.log('data', data)



        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log("OTP Verified:", fullOtp);
      } catch (error) {
        console.log('Error verifying OTP:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (timer > 0 && isOtpSent) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
  }, [timer, isOtpSent]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Phone Verification
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isOtpSent 
              ? "Enter the verification code sent to your phone"
              : "We'll send you a verification code to your phone"
            }
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!isOtpSent ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number (Bangladesh)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-bgColor focus:border-bgColor transition-colors duration-200 sm:text-sm"
                    placeholder="01XXXXXXXXX"
                  />
                </div>
              </div>

              <button
                onClick={requestOtp}
                disabled={isLoading || phone.length !== 11}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bgColor hover:bg-hoverBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgColor transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Code...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Send Code <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter Verification Code
                </label>
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength={1}
                      className="w-14 h-14 text-center text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-bgColor focus:border-bgColor transition-colors duration-200"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={verifyOtp}
                disabled={isLoading || otp.join("").length !== 4}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bgColor hover:bg-hoverBg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bgColor transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Verify Code <Shield className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>

              <div className="text-center">
                {isResendDisabled ? (
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Resend code in {timer} seconds</span>
                  </div>
                ) : (
                  <button
                    onClick={requestOtp}
                    className="text-sm text-bgColor hover:text-hoverBg focus:outline-none focus:underline transition-colors duration-200"
                  >
                    Resend verification code
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
