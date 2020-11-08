# Drone-Alone
Drone-Alone is a project that utilizes Ryze Tello powered by DJI drone to shoot a video of a person for Genelec's Aural ID.

# Project structure

### Frontend
A react-native application. The main part of this project. Used to control the drone. Also opens video stream in the drone to enable recording.

The video stream can be received from the drone with FFMPEG:

Store to a file: `ffmpeg -i udp://0.0.0.0:11111 -f mp4 output.mp4`

See live video: `ffmpeg -i udp://0.0.0.0:11111 -f sdl "Tello"`

### Server
A server that could be deployed online. Receives UDP packets of video data and saves it or displays it with either FFMPEG or MPlayer.
Mostly for testing.

### Tello
A test node application to connect to the drone.


# Contributors
@liimlas
@tomixii
@alqio
