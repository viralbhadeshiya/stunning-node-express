import App from './app.js';
import UsersRoute from './components/user/user.routes.js';

const app = new App([new UsersRoute()]);

app.listen();
