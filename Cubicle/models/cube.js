const fs = require('fs');
const path = require('path');

class Cube {
    constructor() {
        this.data = require(path.resolve('config/database.json'));
    }

    getCubeById(id) {
        const cube = this.data.cubes.find(x => x.id === id);
        
        return cube;
    }

    add(cubeModel) {
        const currentIndex = this.data.index + 1;
        const newCube = { id: currentIndex, ...cubeModel };

        return this.saveChanges(currentIndex, newCube);
    }

    saveChanges(currentIndex, newCube) {
        console.log(this.data.cubes);
        const db = {
            index: currentIndex,
            cubes: this.data.cubes.concat(newCube)
        };

        return this.writeInFile(db, newCube);
    }

    writeInFile(db, newCube) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve('config/database.json'), JSON.stringify(db, null, 2), (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.data = db;
                resolve(newCube);
            });
        });
    }

    create(name, imageUrl, description, difficultyLevel) {
        return { name, imageUrl, description, difficultyLevel };
    }
}

module.exports = new Cube();