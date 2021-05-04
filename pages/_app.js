import Router from 'next/router';
import Navbar from '../components/Navbar';
import NProgress from 'nprogress';
import { AuthContextProvider } from '../stores/authContext';
import '../styles/globals.css';
import 'nprogress/nprogress.css';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<AuthContextProvider>
			<Navbar />
			<Component {...pageProps} />
		</AuthContextProvider>
	);
}

export default MyApp;
