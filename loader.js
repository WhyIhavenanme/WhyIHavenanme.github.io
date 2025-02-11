document.addEventListener('DOMContentLoaded', function() {
    fetch('/pic')
        .then(response => response.json())
        .then(data => {
            const fileExplorer = document.getElementById('file-explorer');
            fileExplorer.appendChild(createFileTree(data, ''));
        });

    function createFileTree(data, parentPath) {
        const ul = document.createElement('ul');
        data.forEach(item => {
            const li = document.createElement('li');
            if (item.type === 'folder') {
                li.classList.add('folder');
                li.textContent = item.name;
                li.addEventListener('click', function(event) {
                    if (event.target === li) {
                        if (li.classList.contains('expanded')) {
                            li.classList.remove('expanded');
                            li.removeChild(li.lastChild);
                        } else {
                            li.classList.add('expanded');
                            fetch(`/pic${parentPath}/${item.name}`)
                                .then(response => response.json())
                                .then(subData => {
                                    li.appendChild(createFileTree(subData, `${parentPath}/${item.name}`));
                                });
                        }
                    }
                });
            } else {
                const a = document.createElement('a');
                a.href = `/pic${parentPath}/${item.name}`;
                a.target = '_blank';
                a.textContent = item.name;
                li.appendChild(a);
            }
            ul.appendChild(li);
        });
        return ul;
    }
});
