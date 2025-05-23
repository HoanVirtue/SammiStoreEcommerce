﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAMMI.ECOM.Infrastructure.Services.Auth.Responses
{
    public class SignInResult
    {
        private static readonly SignInResult _success = new SignInResult { Succeeded = true };
        private static readonly SignInResult _failed = new SignInResult();
        private static readonly SignInResult _notExisted = new SignInResult() { IsNotExisted = true };
        private static readonly SignInResult _lockedOut = new SignInResult { IsLockedOut = true };
        private static readonly SignInResult _notAllowed = new SignInResult { IsNotAllowed = true };
        private static readonly SignInResult _twoFactorRequired = new SignInResult { RequiresTwoFactor = true };
        private static readonly SignInResult _notVerify = new SignInResult { IsNotVerify = true };

        /// <summary>
        /// Returns a flag indication whether the sign-in was successful.
        /// </summary>
        /// <value>True if the sign-in was successful, otherwise false.</value>
        public bool Succeeded { get; protected set; }

        /// <summary>
        /// Returns a flag indication whether the user attempting to sign-in is locked out.
        /// </summary>
        /// <value>True if the user attempting to sign-in is locked out, otherwise false.</value>
        public bool IsLockedOut { get; protected set; }

        /// <summary>
        /// Returns a flag indication whether the user attempting to sign-in is not existed.
        /// </summary>
        /// <value>True if the user attempting to sign-in is not existed, otherwise false.</value>
        public bool IsNotExisted { get; protected set; }

        /// <summary>
        /// Returns a flag indication whether the user attempting to sign-in is not allowed to sign-in.
        /// </summary>
        /// <value>True if the user attempting to sign-in is not allowed to sign-in, otherwise false.</value>
        public bool IsNotAllowed { get; protected set; }

        /// <summary>
        /// Returns a flag indication whether the user attempting to sign-in requires two factor authentication.
        /// </summary>
        /// <value>True if the user attempting to sign-in requires two factor authentication, otherwise false.</value>
        public bool RequiresTwoFactor { get; protected set; }

        public bool IsNotVerify { get; protected set; }

        /// <summary>
        /// Returns a <see cref="SignInResult"/> that represents a successful sign-in.
        /// </summary>
        /// <returns>A <see cref="SignInResult"/> that represents a successful sign-in.</returns>
        public static SignInResult Success => _success;

        /// <summary>
        /// Returns a <see cref="SignInResult"/> that represents a failed sign-in.
        /// </summary>
        /// <returns>A <see cref="SignInResult"/> that represents a failed sign-in.</returns>
        public static SignInResult Failed => _failed;
        /// <summary>
        /// Returns a <see cref="SignInResult"/> that represents a failed sign-in.
        /// </summary>
        /// <returns>A <see cref="SignInResult"/> that represents a failed sign-in.</returns>
        public static SignInResult UserNotExisted => _notExisted;

        /// <summary>
        /// Returns a <see cref="SignInResult"/> that represents a sign-in attempt that failed because 
        /// the user was logged out.
        /// </summary>
        /// <returns>A <see cref="SignInResult"/> that represents sign-in attempt that failed due to the
        /// user being locked out.</returns>
        public static SignInResult LockedOut => _lockedOut;

        /// <summary>
        /// Returns a <see cref="SignInResult"/> that represents a sign-in attempt that failed because 
        /// the user is not allowed to sign-in.
        /// </summary>
        /// <returns>A <see cref="SignInResult"/> that represents sign-in attempt that failed due to the
        /// user is not allowed to sign-in.</returns>
        public static SignInResult NotAllowed => _notAllowed;

        /// <summary>
        /// Returns a <see cref="SignInResult"/> that represents a sign-in attempt that needs two-factor 
        /// authentication.
        /// </summary>
        /// <returns>A <see cref="SignInResult"/> that represents sign-in attempt that needs two-factor
        /// authentication.</returns>
        public static SignInResult TwoFactorRequired => _twoFactorRequired;

        public static SignInResult NotVerify => _notVerify;

        /// <summary>
        /// Converts the value of the current <see cref="SignInResult"/> object to its equivalent string representation.
        /// </summary>
        /// <returns>A string representation of value of the current <see cref="SignInResult"/> object.</returns>
        public override string ToString()
        {
            return IsNotExisted ? "NotExists" :
                IsLockedOut ? "Lockedout" :
                IsNotAllowed ? "NotAllowed" :
                RequiresTwoFactor ? "RequiresTwoFactor" :
                Succeeded ? "Succeeded" : "Failed";
        }
    }
}