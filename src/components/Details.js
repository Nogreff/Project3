import { useLocation, useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import {
	MapContainer,
	TileLayer,
	CircleMarker,
	Popup,
	LayerGroup,
	Circle,
} from 'react-leaflet';
import '../css/Details.css';
function Details() {
	const navigate = useNavigate();
	const location = useLocation();
	const CIRCLE_COLORS = { color: 'red', fillColor: 'green' };
	const EARTHQUAKE_LOCATION = [
		location.state.locationY,
		location.state.locationX,
	];
	const CURRENT_DATE = new Date().toLocaleString([], {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	});
	const LIST_OPTIONS = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'UTC',
	};
	const DETAILS_LIST = new Intl.DateTimeFormat('us-EN', LIST_OPTIONS).format(
		location.state.date
	);
	return (
		<section className='details'>
			<div className='details_info'>
				<h1>
					Magnitude {location.state.magnitude} earthquake,{' '}
					{location.state.region}
				</h1>

				<ul className='details_list'>
					<li>
						<strong>UTC Time:</strong>
						{DETAILS_LIST.substring(0, DETAILS_LIST.length)}
					</li>
					<li>
						<strong>Your Time:</strong>
						{CURRENT_DATE}
					</li>
					<li>
						<strong>Depth:</strong>
						{location.state.depth} km
					</li>
					<li>
						<strong>Coordinates:</strong>
						{location.state.locationX}, {location.state.locationY}
					</li>
					<li className='list_link'>
						<strong>More details:</strong>
						<a href={location.state.USGSPage} target='_blank' rel='noreferrer'>
							See more
						</a>
					</li>
				</ul>
				<a
					className='button_stnd'
					onClick={() => {
						navigate('/');
					}}
				>
					Go back
				</a>
			</div>
			<div className='details_map'>
				<MapContainer
					center={EARTHQUAKE_LOCATION}
					zoom={9}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
					{
						<CircleMarker
							center={[location.state.locationY, location.state.locationX]}
							pathOptions={CIRCLE_COLORS}
							radius={location.state.magnitude * 15}
						>
							<Popup>
								<h5>{location.state.region}</h5>
								<p>Magnitud: {location.state.magnitude}</p>
							</Popup>
						</CircleMarker>
					}
					<LayerGroup>
						<Circle
							center={EARTHQUAKE_LOCATION}
							pathOptions={{ fillColor: 'blue' }}
							radius={location.state.magnitude * 10}
						/>
						<Circle
							center={EARTHQUAKE_LOCATION}
							pathOptions={{ fillColor: 'red' }}
							radius={location.state.magnitude * 5}
							stroke={false}
						/>
					</LayerGroup>
				</MapContainer>
			</div>
		</section>
	);
}

export default Details;
