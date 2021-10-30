const semver = require('semver');
const fs = require("fs");
const path = require("path");


const servicesJsonPath = path.join(__dirname, '..', 'services.json');
console.log(servicesJsonPath);


class ServiceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
    this.timeout = 20;
  }

  get(name, version) {
    this.#getServicesFromFile();
    console.log(this.services);
    this.#cleanup();
    const candidates = Object.values(this.services)
      //.filter(service => service.name === name && semver.satisfies(service.version, ">="+semver.clean(version)));
      .filter(service => service.name === name && service.version === version); // for this simple case, only check if version equals 
    this.#setServicesToFile();
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  register(name, version, ip, port) {
    this.#getServicesFromFile();
    this.#cleanup();
    const key = name + version + ip + port;

    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.services[key].name = name;
      this.services[key].version = version;
      this.log.debug(`Added services ${name}, version ${version} at ${ip}:${port}`);
      this.#setServicesToFile();
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    this.#setServicesToFile();
    this.log.debug(`Updated services ${name}, version ${version} at ${ip}:${port}`);
    return key;
  }

  unregister(name, version, ip, port) {
    this.#getServicesFromFile();
    const key = name + version + ip + port;
    delete this.services[key];
    this.#setServicesToFile();
    return key;
  }

  #cleanup() {
    this.#getServicesFromFile();
    const now = Math.floor(new Date() / 1000);
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key];
        this.log.debug(`Removed service ${key}`);
      }
    });
    this.#setServicesToFile();
  }
  
  #getServicesFromFile() {
    try{
      this.services = JSON.parse(fs.readFileSync(servicesJsonPath));
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  #setServicesToFile(){
    try {
      fs.writeFileSync(servicesJsonPath, JSON.stringify(this.services));
    } catch (err) {
      console.error(err);
      throw err;
    } 
  }
}

module.exports = ServiceRegistry;
