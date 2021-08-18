FROM public.ecr.aws/lambda/nodejs:14

WORKDIR /app

COPY tsconfig.json ./
COPY package.json ./
COPY package-lock.json ./
COPY src /app/src

RUN npm install
RUN ls -a
RUN npm run build

# Command can be overwritten by providing a different command in the template directly.
CMD ["node", "bin/app.js"]
