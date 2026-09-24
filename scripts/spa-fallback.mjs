// GitHub Pages has no server-side routing. Serving index.html as 404.html lets
// deep links such as /TOURISM/destinations/taj-mahal load the React app.
import { copyFileSync } from 'node:fs'

copyFileSync('dist/index.html', 'dist/404.html')
