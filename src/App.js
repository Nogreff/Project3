import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Details from './components/Details';
import { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class App extends Component {
	state = {
		quake: [],
		eqInfo: [],
		eqFilter: null,
		mountCheck: false,
		eqDay: new Date(),
		dateNow: new Date(),
		dStart: new Date(),
		dEnd: new Date(),
		dateUTC: new Date().getUTCHours(),
	};

	eqTop = () =>
		'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' +
		this.state.eqDay.toISOString().replace(/T.*/, '').split('-').join('-') +
		'&endtime=' +
		this.state.dEnd.toISOString().replace(/T.*/, '').split('-').join('-') +
		'&minmagnitude=6.5';

	eqDefault = () =>
		'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' +
		this.state.dStart.toISOString().replace(/T.*/, '').split('-').join('-') +
		'&endtime=' +
		this.state.dEnd.toISOString().replace(/T.*/, '').split('-').join('-') +
		'';

	dateConfig = () => {
		if (this.state.dateUTC > -1 && this.state.dateUTC < 3) {
			this.state.dStart.setDate(this.state.dStart.getDate() - 1);
			this.state.dEnd.setDate(this.state.dEnd.getDate() + 2);
		} else if (this.state.dStart.getHours() > this.state.dateUTC) {
			this.state.dStart.setDate(this.state.dStart.getDate() - 1);
			this.state.dEnd.setDate(this.state.dEnd.getDate());
		} else {
			this.state.dStart.setDate(this.state.dStart.getDate());
			this.state.dEnd.setDate(this.state.dEnd.getDate() + 1);
		}
	};

	setEQDay = () => {
		if (this.state.eqDay.getTime() === this.state.dateNow.getTime()) {
			this.setState({
				eqDay: this.state.eqDay.setDate(this.state.dateNow.getDate() - 365),
			});
		}
	};

	getFilter = () => {
		return new Promise((resolve, reject) => {
			if (this.state.eqFilter != null) {
				resolve(this.state.eqFilter);
			}
		});
	};

	apiRequest = async () => {
		console.log(this.state.eqFilter);
		if (this.state.eqFilter === null) {
			const URL = this.eqDefault();
			fetch(URL)
				.then(response => response.json())
				.then(data => {
					this.setState({ quake: data });
				});
		} else {
			const URL = await this.getFilter();
			fetch(URL)
				.then(response => response.json())
				.then(data => {
					this.setState({ quake: data });
				});
		}
	};

	apiNewRequest = async () => {
		const URL = await this.getFilter();
		console.log(URL);
		fetch(URL)
			.then(response => response.json())
			.then(data => {
				this.setState({ quake: data });
			});
	};

	apiInfo = () => {
		const URL = this.eqTop();
		fetch(URL)
			.then(response => response.json())
			.then(data => {
				const dataSorted = data.features
					.sort(function (a, b) {
						const c = a.properties.mag;
						const d = b.properties.mag;
						return d - c;
					})
					.slice(0, 5);
				this.setState({
					eqInfo: dataSorted,
				});
			});
	};

	eqRequest = async (start, minMag) => {
		console.log(start, minMag);
		const EQSTART = '&starttime=' + start + '';
		const EQEND =
			'&endtime=' +
			this.state.dEnd.toISOString().replace(/T.*/, '').split('-').join('-') +
			'&minmagnitude=' +
			minMag +
			'';
		this.setState({
			eqFilter:
				'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson' +
				EQSTART +
				EQEND,
		});

		this.getFilter().then(this.apiNewRequest());
	};

	componentDidMount() {
		this.setState.mountCheck = true;
		this.dateConfig();
		this.eqDefault();
		this.setEQDay();
		this.apiInfo();
		this.apiRequest();
		console.log('Component did mount');
	}

	render() {
		return (
			<div className='App'>
				<Router>
					<Header />
					<Routes>
						<Route
							path='/'
							element={
								<Home
									eqData={this.state.quake.features}
									eqRequest={this.eqRequest}
									eqInfo={this.state.eqInfo}
									mountCheck={this.state.mountCheck}
								/>
							}
						/>
						<Route path='/Details' element={<Details />} />
					</Routes>
					<Footer />
				</Router>
			</div>
		);
	}
}

export default App;
