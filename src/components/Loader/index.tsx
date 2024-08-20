import { CirclesWithBar } from 'react-loader-spinner';

import "./index.css"

const Loader = ()=><div className ="spinner-container"><CirclesWithBar height="100" width="100" color="#4fa94d"
outerCircleColor="white"
innerCircleColor="white"
barColor="white"
ariaLabel="circles-with-bar-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>
</div>

export default Loader;