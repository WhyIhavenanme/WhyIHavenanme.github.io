const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const picDir = path.join(__dirname, 'pic');

app.use(express.static(__dirname));

app.get('/pic*', (req, res) => {
    const dirPath = path.join(picDir, req.params[0]);
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        const result = files.map(file => ({
            name: file.name,
            type: file.isDirectory() ? 'folder' : 'file'
        }));
        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
