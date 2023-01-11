import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/HomeLatest.css';

function HomeLatest(props) {
	const { eqData } = props;
	const [eqLatest, setEqLatest] = useState([]);
	const [latestCheck, setLatestCheck] = useState(false);
	const navigate = useNavigate();
	let latestEq;
	if (eqData) {
		latestEq = eqData.slice(0, 10);
		if (latestCheck === false && latestEq && eqData) {
			latestEq = eqData.slice(0, 10);
			setEqLatest(latestEq);
			setLatestCheck(true);
		}
		latestEq = eqLatest;
	}
	return (
		<section className='home_latest'>
			<div className='latest_wrap'>
				<h1>Latest earthquakes</h1>
				<ul className='latest_description'>
					<li>Date & time</li>
					<li>Depth</li>
					<li>Magnitude</li>
					<li>Region name</li>
				</ul>
				<ul className='latest_detail'>
					{eqData && latestEq
						? latestEq.map((item, index) => {
								let timeUTC = new Date(item.properties.time);
								timeUTC = timeUTC.toLocaleString([], {
									year: 'numeric',
									month: 'numeric',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								});
								const toDetails = () => {
									navigate('/Details', {
										state: {
											region: item.properties.place,
											date: item.properties.time,
											magnitude: item.properties.mag,
											depth: item.geometry.coordinates[2],
											locationX: item.geometry.coordinates[0],
											locationY: item.geometry.coordinates[1],
											USGSPage: item.properties.url,
										},
									});
								};
								return (
									<li key={index}>
										<span>{timeUTC}</span>
										<span>
											{String(item.geometry.coordinates[2]).slice(0, 5)} km
										</span>
										<span>{String(item.properties.mag).slice(0, 5)} md</span>
										<span
											onClick={() => {
												toDetails();
											}}
										>
											<a>{item.properties.place}</a>
										</span>
									</li>
								);
						  })
						: null}
				</ul>
			</div>
		</section>
	);
}
HomeLatest.propTypes = {
	eqData: PropTypes.array,
};
export default HomeLatest;
