'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const authState = useState({
		user: null,
	});

	return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const [auth, setAuth] = useContext(AuthContext);

	function login(user) {
		setAuth({ user });
	}

	function logout() {
		if (auth.user) {
			setAuth({
				user: null,
			});
		}
	}

	return {
		user: auth.user,

		login,
		logout,
	};
}

export default AuthContext;
