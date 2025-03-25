import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEnvelope, FaEye, FaEyeSlash, FaUser } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { AuthContext } from '../../component/AuthContext/AuthProvider';

const SignUp = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        if (loggedUser) {
          const profile = {
            displayName: data.name,
            photoURL: "https://i.ibb.co/4Y8xYZD/default-user.png" // default image
          }
          
          updateUserProfile(profile)
            .then(() => {
              const userInfo = {
                name: data.name,
                email: data.email,
                image: profile.photoURL
              }
              
              axiosPublic.post('/users', userInfo)
                .then(res => {
                  if (res.data.insertedId) {
                    reset();
                    Swal.fire({
                      title: "Registration Successful!",
                      showClass: "animate__animated animate__fadeInUp animate__faster",
                      hideClass: "animate__animated animate__fadeOutDown animate__faster"
                    });
                    navigate('/');
                  }
                })
            })
            .catch(error => {
              console.log(error);
            })
        }
      })
      .catch(error => {
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
        });
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Helmet>
        <title>SalimChatbot | Sign Up</title>
      </Helmet>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create an account</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.name && (
              <span className="text-red-600 text-sm">Name is required</span>
            )}
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-gray-400" />
            </div>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="your.email@example.com"
              className="w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {errors.email && (
              <span className="text-red-600 text-sm">Email is required</span>
            )}
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])/
              })}
              placeholder="Password"
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
              ) : (
                <FaEye className="text-gray-400 hover:text-gray-600" />
              )}
            </button>
            {errors.password?.type === "required" && (
              <p className="text-red-600 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 text-sm">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600 text-sm">Password must be less than 20 characters</p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 text-sm">Password must include uppercase, lowercase, and number</p>
            )}
          </div>
          
          <button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md text-lg transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-center text-lg mt-8">
          Already have an account?{' '}
          <Link to="/signin" className="text-teal-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;