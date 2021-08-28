import {Route,Switch} from 'react-router-dom';
import Home from '../../src/core/Home'
import SignUp from '../../src/user/SignUp'
import SignIn from '../../src/user/SignIn'
const MainRouter=()=>(
    <div>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/signin" component={SignIn}></Route>
        </Switch>
    </div>
);
export default MainRouter;