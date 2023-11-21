import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { DiscussionsRoute } from './routes/discussions.route';
import { EventsRoute } from './routes/events.route';
import { QuestionRoute } from './routes/questions.route';
import { RepliesRoute } from './routes/replies.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new EventsRoute(), new DiscussionsRoute(), new QuestionRoute(), new RepliesRoute()]);

app.listen();
