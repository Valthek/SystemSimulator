# SystemSimulator
Application to simulate a small starsystem and plot courses within it

The basic premise of the project is to simulate a fictional star system's planetary movements, including moons and planetary bodies.
The data is provided in an XML format which is read out at run time. Each planet's position is simulated individually and their absolute
positions are used for calculations (with some rounding to keep things sane)

The projects runs on Angular 2, so an installation of Node Package Manager is required to run it locally. The data folder includes the xml
file describing the behavior of the planets as well as (currently) unused images for the different planets themselves as well as an excel
document where some of the initial calculations were done.

