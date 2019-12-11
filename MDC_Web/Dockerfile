# Create image based on the official Node 6 image from dockerhub
FROM node as config-primestone-build
#Install angular cli
RUN npm install --unsafe-perm -g @angular/cli
# Create a directory where our app will be placed
RUN mkdir -p /opt/config-primestone
# Copy application
COPY ./ /opt/config-primestone
# Change directory so that our commands run inside this new directory
WORKDIR /opt/config-primestone
# Install dependencies
RUN npm install
#Compile the angular 4 application
RUN ng build --prod --aot
#Create image based on the official nginx image from dockerhub
FROM nginx
#Copy nginx configuration
COPY default.conf /etc/nginx/conf.d
#Copy compiled application to nginx folder
COPY --from=config-primestone-build /opt/config-primestone/dist/front-xm /usr/share/nginx/html
EXPOSE 80