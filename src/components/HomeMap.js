import PropTypes from 'prop-types';
import '../css/HomeMap.css';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

function HomeMap(props) {
	const { eqData, eqRequest } = props;
	const [quakeStart, setQuakeStart] = useState('');
	const [minMagnitude, setMagnitude] = useState('');
	const navigate = useNavigate();
	// const btnRef = useRef(null);
	const STARTER_POSITION = [51.505, -0.09];
	let date24 = new Date();
	let date7d = new Date();
	let date30d = new Date();
	const searchBtn = document.querySelector('.search_btn');
	date24.setDate(date24.getDate() - 1);
	date7d.setDate(date7d.getDate() - 7);
	date30d.setDate(date30d.getDate() - 30);
	date24 = date24.toISOString().replace(/T.*/, '').split('-').join('-');
	date7d = date7d.toISOString().replace(/T.*/, '').split('-').join('-');
	date30d = date30d.toISOString().replace(/T.*/, '').split('-').join('-');
	if (searchBtn) {
		console.log(quakeStart, minMagnitude);
		searchBtn.addEventListener('click', e => {
			const dateError = document.querySelector('.wrapper_combo_date');
			const magError = document.querySelector('.wrapper_combo_magnitude');
			if (quakeStart && minMagnitude) {
				console.log(quakeStart, minMagnitude);
				eqRequest(quakeStart, minMagnitude);
				dateError.classList.remove('error');
				magError.classList.remove('error');
			} else {
				if (!quakeStart) {
					dateError.classList.add('error');
				} else {
					dateError.classList.remove('error');
				}
				if (!minMagnitude) {
					magError.classList.add('error');
				} else {
					magError.classList.remove('error');
				}
			}
		});
	}

	return (
		<section className='home_map'>
			<h1>World map</h1>
			<div className='map_container'>
				<div className='map_options'>
					<div className='combobox_container combo_date'>
						<span className='combobox_name'>Date:</span>
						<span className='wrapper_combo_date'>
							<select
								onChange={e => setQuakeStart(e.target.value)}
								required=''
								id='date_options'
							>
								<option value=''></option>
								<option value={date24}>Last 24h</option>
								<option value={date7d}>Last 7 days</option>
								<option value={date30d}>Last 30 days</option>
							</select>
						</span>
					</div>
					<div className='combobox_container combo_magnitude'>
						<span className='combobox_name'>Magnitude:</span>
						<span className='wrapper_combo_magnitude'>
							<select
								onChange={e => setMagnitude(e.target.value)}
								required=''
								id='mag_options'
							>
								<option value=''></option>
								<option value={0}>Show all</option>
								<option value={1}>&#8925;1</option>
								<option value={2}>&#8925;2</option>
								<option value={3}>&#8925;3</option>
								<option value={4}>&#8925;4</option>
								<option value={5}>&#8925;5</option>
								<option value={6}>&#8925;6</option>
								<option value={7}>&#8925;7</option>
							</select>
						</span>
					</div>
					<div className='map_input'>
						<a className='search_btn'>Search</a>
					</div>
				</div>
				<div className='map_data'>
					<MapContainer
						center={STARTER_POSITION}
						zoom={2}
						scrollWheelZoom={false}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						/>
						{eqData
							? eqData.map((x, index) => {
									// z++;
									const dateRaw = new Date(x.properties.time);
									const dateFormat = dateRaw.toLocaleString();
									const toDetails = () => {
										navigate('/Details', {
											state: {
												region: x.properties.place,
												date: x.properties.time,
												magnitude: x.properties.mag,
												depth: x.geometry.coordinates[2],
												locationX: x.geometry.coordinates[0],
												locationY: x.geometry.coordinates[1],
												USGSPage: x.properties.url,
											},
										});
									};
									const colorMag =
										x.properties.mag < 4
											? { color: 'green' }
											: x.properties.mag < 5.5
											? { color: 'darkorange' }
											: { color: 'red' };
									return (
										<CircleMarker
											center={[
												x.geometry.coordinates[1],
												x.geometry.coordinates[0],
											]}
											pathOptions={colorMag}
											radius={x.properties.mag * 5}
											key={index}
										>
											<Popup>
												<div className='circle_container'>
													<h4>{x.properties.place}</h4>
													<p>
														<strong>Magnitude: </strong>
														{x.properties.mag}
													</p>
													<p>
														<strong>Date: </strong>
														{dateFormat.substring(0, dateFormat.length - 3)}
													</p>
													<a
														onClick={() => {
															toDetails();
														}}
													>
														See details
													</a>
												</div>
											</Popup>
										</CircleMarker>
									);
							  })
							: null}
					</MapContainer>
				</div>
			</div>
		</section>
	);
}
HomeMap.propTypes = {
	eqData: PropTypes.array,
	eqRequest: PropTypes.func,
};
export default HomeMap;
