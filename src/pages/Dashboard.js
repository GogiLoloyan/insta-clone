import PropTypes from 'prop-types';

import Header from '../components/Header';
// import Timeline from '../components/timeline';
import Sidebar from '../components/Sidebar';

import { useUser } from '../hooks/useUser';
import { useSiteTitle } from '../hooks/useSiteTitle';

import { LoggedInUserContext } from '../context/loggedInUser';

const Dashboard = ({ user: loggedInUser }) => {
    useSiteTitle('Instagram')
    const { user, setActiveUser } = useUser(loggedInUser.uid);

    return (
        <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
            <div className="bg-gray-background">
                <Header />
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    {/* <Timeline /> */}
                    <Sidebar />
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
}

Dashboard.propTypes = {
    user: PropTypes.object.isRequired
};

export default Dashboard;