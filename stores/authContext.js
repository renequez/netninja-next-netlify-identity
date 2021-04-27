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

	const login = () => {
		netlifyIdentity.open();
	};

	const logout = () => {
		netlifyIdentity.logout();
	};

	useEffect(() => {
		// init netlify identity connection
		netlifyIdentity.init();

		// add listeners
		netlifyIdentity.on('login', (user) => {
			setUser(user);
			netlifyIdentity.close();
			console.log('Login event');
		});

		netlifyIdentity.on('logout', () => {
			setUser(null);
			console.log('Logout event');
		});

		// remove listeners
		return () => {
			netlifyIdentity.off('login');
			netlifyIdentity.off('logout');
		};
	}, []);

	const context = {
		user,
		login,
		logout,
	};

	return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
