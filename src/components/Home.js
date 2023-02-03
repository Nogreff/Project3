import PropTypes from 'prop-types';
import HomeInfo from './HomeInfo';
import HomeMap from './HomeMap';
import HomeLatest from './HomeLatest';
import '../css/Home.css';

function Home(props) {
	const { eqData, eqRequest, eqInfo, mountCheck } = props;
	return (
		<div className='home_container'>
			<HomeInfo eqInfo={eqInfo} mountCheck={mountCheck} />
			<HomeMap eqData={eqData} eqRequest={eqRequest} />
			<HomeLatest eqData={eqData} />
		</div>
	);
}
Home.propTypes = {
	eqData: PropTypes.array,
	eqRequest: PropTypes.func,
	eqInfo: PropTypes.array,
	mountCheck: PropTypes.bool,
};
export default Home;