import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../css/HomeInfo.css';

function HomeInfo(props) {
	const { eqInfo } = props;
	const navigate = useNavigate();
	return (
		<section className='home_info'>
			<div className='info_container'>
				<h1>The biggest earthquakes from the last 365 days</h1>
				<ul className='info_list'>
					{eqInfo
						? eqInfo.map((value, index) => {
								const toDetails = () => {
									navigate('/Details', {
										state: {
											region: value.properties.place,
											date: value.properties.time,
											magnitude: value.properties.mag,
											depth: value.geometry.coordinates[2],
											locationX: value.geometry.coordinates[0],
											locationY: value.geometry.coordinates[1],
											USGSPage: value.properties.url,
										},
									});
								};
								const INFO_DATE = new Date(
									value.properties.time
								).toLocaleString([], {
									year: 'numeric',
									month: 'numeric',
									day: 'numeric',
									hour: '2-digit',
									minute: '2-digit',
									hour12: false,
								});
								return (
									<li key={index}>
										<span>{value.properties.mag}</span>
										<span className='info_date'>{INFO_DATE}</span>
										<span
											onClick={() => {
												toDetails();
											}}
										>
											<a>{value.properties.place}</a>
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
HomeInfo.propTypes = {
	eqInfo: PropTypes.array,
};
export default HomeInfo;
