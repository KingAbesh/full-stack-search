import app from "./src/app";
import logger from "./src/utils/logger";
import { RedisService } from "./src/utils/redisCache";

const port = process.env.PORT || 3001;

const initServer = () => {
  app.listen(port, async () => {
    logger.info(`Server is running on port ${port}`);
    RedisService.connectRedis();
  });
};

initServer();
