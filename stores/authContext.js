import { createContext, useContext, useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext({
	user: null,
	login: () => {},
	logout: () => {},
	authReady: false,
});

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authReady, setAuthReady] = useState(false);

	const login = () => {
		netlifyIdentity.open();
	};

	const logout = () => {
		netlifyIdentity.logout();
	};

	useEffect(() => {
		// init netlify identity connection

		// add listeners
		netlifyIdentity.on('login', (user) => {
			setUser(user);
			netlifyIdentity.close();
			console.log('login event / user:', user);
		});

		netlifyIdentity.on('logout', () => {
			setUser(null);
			console.log('logout event');
		});

		netlifyIdentity.on('init', (user) => {
			setUser(user);
			setAuthReady(true);
			console.log('init event');
		});

		netlifyIdentity.init();
		// remove listeners
		return () => {
			netlifyIdentity.off('login');
			netlifyIdentity.off('logout');
			// netlifyIdentity.off('init');
		};
	}, []);

	const context = {
		user,
		login,
		logout,
		authReady,
	};

	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
