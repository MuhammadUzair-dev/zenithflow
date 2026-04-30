/** ZenithFlow – Skills Template Database */

const t = (title, desc, time, type) => ({ title, desc, time, type });

export const SKILL_TEMPLATES = {
  'threejs': {
    name: 'Three.js',
    icon: '🎮',
    weeks: [
      {
        theme: 'Foundations of 3D on the Web',
        desc: 'Set up your environment, understand scenes, cameras, and renderers.',
        tasks: [
          t('Install Three.js & Dev Environment', 'Set up Node.js, Vite, and install Three.js. Create your first project scaffold.', 45, 'learn'),
          t('Scene, Camera, Renderer', 'Understand the 3 pillars of every Three.js app. Create a basic scene with a spinning cube.', 60, 'learn'),
          t('Geometries & Materials', 'Explore BoxGeometry, SphereGeometry, MeshBasicMaterial, and MeshStandardMaterial.', 50, 'learn'),
          t('Lighting Essentials', 'Add AmbientLight, DirectionalLight, and PointLight to your scene.', 45, 'practice'),
          t('OrbitControls & Interactivity', 'Let users rotate and zoom. Import OrbitControls and handle window resize.', 40, 'practice'),
          t('Build: Solar System Model', 'Create a simple solar system with rotating planets using what you learned.', 90, 'build'),
        ]
      },
      {
        theme: 'Textures, Models & Animation',
        desc: 'Load textures, import 3D models, and create smooth animations.',
        tasks: [
          t('Texture Loading & UV Mapping', 'Use TextureLoader to apply images to meshes. Understand UV coordinates.', 60, 'learn'),
          t('Loading 3D Models (GLTF)', 'Use GLTFLoader to import Blender/Sketchfab models into your scene.', 55, 'learn'),
          t('Animation Loop & Clock', 'Master requestAnimationFrame, THREE.Clock, and delta-time animations.', 45, 'learn'),
          t('Raycasting & Click Detection', 'Detect which object the user clicked using Raycaster.', 50, 'practice'),
          t('Shadows & Environment Maps', 'Enable shadow maps and add HDR environment reflections.', 55, 'practice'),
          t('Build: Interactive Gallery', 'Create a 3D gallery where users click objects to see info cards.', 100, 'build'),
        ]
      },
      {
        theme: 'Shaders & Post-Processing',
        desc: 'Dive into custom shaders and visual effects.',
        tasks: [
          t('Intro to GLSL Shaders', 'Write your first vertex and fragment shader. Understand uniforms and varyings.', 70, 'learn'),
          t('ShaderMaterial Deep Dive', 'Create custom materials with ShaderMaterial and animated uniforms.', 65, 'learn'),
          t('Post-Processing Effects', 'Add bloom, film grain, and outline effects with EffectComposer.', 55, 'practice'),
          t('Particle Systems', 'Create thousands of animated particles using Points and BufferGeometry.', 60, 'practice'),
          t('Build: Particle Landscape', 'Design an interactive particle terrain that responds to mouse movement.', 110, 'build'),
        ]
      },
      {
        theme: 'Portfolio Project',
        desc: 'Combine everything into a polished, deployable 3D web experience.',
        tasks: [
          t('Project Planning & Design', 'Sketch your final project. Plan scene structure and interactions.', 45, 'learn'),
          t('Scene Architecture', 'Build the multi-section scene with camera transitions and waypoints.', 80, 'build'),
          t('Performance Optimization', 'Implement LOD, texture compression, dispose patterns, and stats monitoring.', 60, 'practice'),
          t('Responsive & Mobile Support', 'Handle touch events, resize, and device pixel ratio for mobile.', 50, 'practice'),
          t('Deploy to Production', 'Build, optimize, and deploy your 3D experience to Vercel or Netlify.', 45, 'build'),
        ]
      }
    ],
    challenges: [
      { q: 'What are the three essential components needed to display anything in Three.js?', options: ['Scene, Camera, Renderer', 'Mesh, Light, Shadow', 'Geometry, Material, Texture', 'Canvas, WebGL, DOM'], answer: 0 },
      { q: 'Which loader is used to import .glb/.gltf 3D model files?', options: ['OBJLoader', 'FBXLoader', 'GLTFLoader', 'STLLoader'], answer: 2 },
      { q: 'What does a Raycaster do in Three.js?', options: ['Creates light rays', 'Detects intersections between a ray and objects', 'Renders ray-traced images', 'Animates objects along a path'], answer: 1 },
      { q: 'In GLSL, what is a "uniform"?', options: ['A variable that changes per vertex', 'A constant passed from JS to the shader', 'A built-in color value', 'A texture coordinate'], answer: 1 },
    ],
    resources: [
      { title: 'Three.js Journey Course', type: 'video', url: 'https://threejs-journey.com/', duration: '40+ hours' },
      { title: 'Three.js Official Docs', type: 'docs', url: 'https://threejs.org/docs/', duration: 'Reference' },
      { title: 'Discover Three.js (Book)', type: 'article', url: 'https://discoverthreejs.com/', duration: '~12 hours' },
      { title: 'Three.js GitHub Examples', type: 'repo', url: 'https://github.com/mrdoob/three.js', duration: 'Reference' },
    ]
  },

  'python': {
    name: 'Python Programming',
    icon: '🐍',
    weeks: [
      {
        theme: 'Python Fundamentals',
        desc: 'Variables, data types, control flow, and functions.',
        tasks: [
          t('Setup & Hello World', 'Install Python, set up VS Code, write your first script.', 30, 'learn'),
          t('Variables & Data Types', 'Strings, integers, floats, booleans, and type conversion.', 45, 'learn'),
          t('Control Flow', 'if/elif/else statements, comparison operators, logical operators.', 45, 'learn'),
          t('Loops & Iteration', 'for loops, while loops, range(), break, continue.', 50, 'practice'),
          t('Functions & Scope', 'Define functions, parameters, return values, local vs global scope.', 55, 'practice'),
          t('Build: Number Guessing Game', 'Create an interactive CLI game using everything learned.', 60, 'build'),
        ]
      },
      {
        theme: 'Data Structures & File I/O',
        desc: 'Lists, dictionaries, file handling, and error management.',
        tasks: [
          t('Lists & Tuples', 'Create, access, slice, and manipulate lists and tuples.', 50, 'learn'),
          t('Dictionaries & Sets', 'Key-value pairs, set operations, nested structures.', 50, 'learn'),
          t('List Comprehensions', 'Write concise list transformations and filtering.', 40, 'practice'),
          t('File Reading & Writing', 'Open, read, write, and manage files with context managers.', 45, 'practice'),
          t('Error Handling', 'try/except/finally, custom exceptions, debugging techniques.', 45, 'learn'),
          t('Build: Contact Book App', 'CLI app to add, search, and delete contacts stored in a JSON file.', 80, 'build'),
        ]
      },
      {
        theme: 'OOP & Modules',
        desc: 'Object-oriented programming, modules, and packages.',
        tasks: [
          t('Classes & Objects', 'Define classes, __init__, instance methods, attributes.', 60, 'learn'),
          t('Inheritance & Polymorphism', 'Extend classes, override methods, use super().', 55, 'learn'),
          t('Modules & Packages', 'Import, create modules, understand __name__ == "__main__".', 40, 'learn'),
          t('Decorators & Generators', 'Write decorators, understand yield and generator functions.', 55, 'practice'),
          t('Build: Library Management System', 'OOP-based system with books, members, and borrowing logic.', 90, 'build'),
        ]
      },
      {
        theme: 'Real-World Project',
        desc: 'APIs, testing, and a capstone project.',
        tasks: [
          t('Working with APIs', 'Use requests library to fetch data from REST APIs.', 50, 'learn'),
          t('Data Processing with JSON', 'Parse, transform, and analyze JSON data sets.', 45, 'practice'),
          t('Unit Testing with pytest', 'Write and run tests for your code.', 50, 'practice'),
          t('Virtual Environments & pip', 'Manage dependencies with venv and requirements.txt.', 30, 'learn'),
          t('Build: Weather Dashboard CLI', 'Fetch weather data from an API and display formatted forecasts.', 100, 'build'),
        ]
      }
    ],
    challenges: [
      { q: 'What is the output of: print(type([]))?', options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], answer: 0 },
      { q: 'Which keyword is used to handle exceptions in Python?', options: ['catch', 'except', 'handle', 'error'], answer: 1 },
      { q: 'What does the __init__ method do in a Python class?', options: ['Destroys the object', 'Initializes instance attributes', 'Imports modules', 'Creates a static method'], answer: 1 },
      { q: 'What is a list comprehension?', options: ['A way to compress lists', 'A concise way to create lists', 'A sorting algorithm', 'A type of loop'], answer: 1 },
    ],
    resources: [
      { title: 'Python for Everybody (Coursera)', type: 'video', url: 'https://www.coursera.org/specializations/python', duration: '8 months' },
      { title: 'Official Python Tutorial', type: 'docs', url: 'https://docs.python.org/3/tutorial/', duration: 'Reference' },
      { title: 'Automate the Boring Stuff', type: 'article', url: 'https://automatetheboringstuff.com/', duration: '~15 hours' },
      { title: 'Python GitHub Awesome List', type: 'repo', url: 'https://github.com/vinta/awesome-python', duration: 'Reference' },
    ]
  },

  'italian-cooking': {
    name: 'Italian Cooking',
    icon: '🍝',
    weeks: [
      {
        theme: 'Foundations of Italian Cuisine',
        desc: 'Pantry essentials, knife skills, and basic sauces.',
        tasks: [
          t('Stock Your Italian Pantry', 'Essential ingredients: San Marzano tomatoes, olive oil, Parmigiano, pasta, garlic.', 30, 'learn'),
          t('Knife Skills & Mise en Place', 'Learn basic cuts: mince, dice, chiffonade. Organize your workspace.', 45, 'practice'),
          t('Master Tomato Sauce', 'Make a classic marinara from scratch. Understand simmering vs reducing.', 60, 'practice'),
          t('Cook Perfect Pasta', 'Salting water, al dente timing, pasta water reserve technique.', 40, 'practice'),
          t('Aglio e Olio', 'Make this elegant 5-ingredient pasta. Master garlic without burning.', 50, 'build'),
        ]
      },
      {
        theme: 'Classic Primi Piatti',
        desc: 'First courses: risotto, fresh pasta, and classic sauces.',
        tasks: [
          t('Cacio e Pepe', 'The art of emulsifying pecorino and pepper into a silky sauce.', 55, 'practice'),
          t('Risotto Fundamentals', 'Toast rice, deglaze, add broth gradually. Make Risotto alla Milanese.', 70, 'learn'),
          t('Fresh Pasta Dough', 'Make egg pasta from scratch: 00 flour, eggs, kneading, resting.', 75, 'practice'),
          t('Carbonara (The Real Way)', 'Guanciale, eggs, pecorino — no cream! Master the technique.', 60, 'build'),
        ]
      },
      {
        theme: 'Secondi & Contorni',
        desc: 'Main courses, sides, and expanding your repertoire.',
        tasks: [
          t('Chicken Parmigiana', 'Bread, fry, and bake. Layer with mozzarella and sauce.', 70, 'practice'),
          t('Italian Braised Meats', 'Slow-cook a braciole or osso buco. Understand braising.', 80, 'learn'),
          t('Roasted Vegetables Italian-Style', 'Caponata, roasted peppers, grilled zucchini with herbs.', 45, 'practice'),
          t('Homemade Focaccia', 'High-hydration dough, olive oil pools, rosemary and sea salt.', 75, 'build'),
        ]
      },
      {
        theme: 'Dolci & Dinner Party',
        desc: 'Desserts and hosting a full Italian dinner.',
        tasks: [
          t('Classic Tiramisù', 'Layer savoiardi, mascarpone cream, espresso, and cocoa.', 60, 'practice'),
          t('Panna Cotta', 'Silky vanilla cream dessert with berry coulis.', 45, 'practice'),
          t('Menu Planning', 'Design a 3-course Italian dinner menu with wine pairings.', 40, 'learn'),
          t('Host Your Italian Dinner', 'Cook the full menu. Plate beautifully. Enjoy with friends!', 180, 'build'),
        ]
      }
    ],
    challenges: [
      { q: 'What is the correct way to salt pasta water?', options: ['A pinch of salt', 'It should taste like the sea', 'No salt needed', 'Add salt after cooking'], answer: 1 },
      { q: 'What does "al dente" literally mean?', options: ['To the sauce', 'To the tooth', 'To the plate', 'To the chef'], answer: 1 },
      { q: 'Which cheese is traditionally used in Cacio e Pepe?', options: ['Mozzarella', 'Parmigiano', 'Pecorino Romano', 'Ricotta'], answer: 2 },
      { q: 'What is the key ingredient in Carbonara that should NEVER be used?', options: ['Eggs', 'Cream', 'Guanciale', 'Pecorino'], answer: 1 },
    ],
    resources: [
      { title: 'Italia Squisita (YouTube)', type: 'video', url: 'https://www.youtube.com/@italiasquisita', duration: '200+ videos' },
      { title: 'The Silver Spoon Cookbook', type: 'article', url: 'https://www.phaidon.com/store/food-cook/the-silver-spoon-9780714862563/', duration: 'Reference' },
      { title: 'Vincenzo\'s Plate (YouTube)', type: 'video', url: 'https://www.youtube.com/@vincenzosplate', duration: '500+ videos' },
      { title: 'Serious Eats – Italian', type: 'docs', url: 'https://www.seriouseats.com/italian-recipes-5117790', duration: 'Reference' },
    ]
  },

  'guitar': {
    name: 'Guitar',
    icon: '🎸',
    weeks: [
      { theme: 'Getting Started', desc: 'Tuning, posture, and first chords.', tasks: [
        t('Guitar Anatomy & Tuning', 'Learn the parts of a guitar and how to tune with an app.', 30, 'learn'),
        t('Proper Posture & Hand Position', 'Classical vs casual position, thumb placement, finger curl.', 25, 'learn'),
        t('First 3 Chords: G, C, D', 'Learn open chords and practice clean transitions.', 50, 'practice'),
        t('Strumming Patterns', 'Down strums, down-up patterns, keeping rhythm.', 45, 'practice'),
        t('Play Your First Song', 'Play a simple 3-chord song all the way through.', 60, 'build'),
      ]},
      { theme: 'Building Foundations', desc: 'More chords, finger picking, and music theory basics.', tasks: [
        t('Minor Chords: Am, Em, Dm', 'Add minor chords and practice major-minor transitions.', 50, 'learn'),
        t('Basic Music Theory', 'Notes, scales, the major scale pattern, keys.', 45, 'learn'),
        t('Fingerpicking Intro', 'Travis picking pattern, PIMA finger assignment.', 55, 'practice'),
        t('Barre Chord: F Major', 'The hardest beginner chord. Techniques to build strength.', 60, 'practice'),
        t('Play: 3 Complete Songs', 'Learn and play 3 songs of your choice using all chords learned.', 90, 'build'),
      ]},
      { theme: 'Intermediate Skills', desc: 'Scales, pentatonic, and lead guitar basics.', tasks: [
        t('Pentatonic Scale', 'Learn the minor pentatonic in position 1. Practice with a metronome.', 50, 'learn'),
        t('Hammer-ons & Pull-offs', 'Legato technique for smoother, faster playing.', 45, 'practice'),
        t('Power Chords & Palm Muting', 'Rock/punk essentials: 5th chords and muted strumming.', 45, 'practice'),
        t('12-Bar Blues', 'Learn the classic blues progression and shuffle rhythm.', 55, 'practice'),
        t('Record Yourself', 'Record a full song or jam with backing track.', 60, 'build'),
      ]},
      { theme: 'Putting It Together', desc: 'Song writing, performance, and repertoire.', tasks: [
        t('Chord Progressions & Songwriting', 'Common progressions (I-V-vi-IV), writing your own.', 50, 'learn'),
        t('Capo & Transposing', 'Use a capo to change keys instantly.', 30, 'learn'),
        t('Build a 10-Song Repertoire', 'Compile and polish 10 songs you can play confidently.', 120, 'practice'),
        t('Perform for Someone', 'Play your favorite song for a friend or record a video.', 45, 'build'),
      ]},
    ],
    challenges: [
      { q: 'What are the open string notes from lowest to highest?', options: ['E A D G B E', 'E B G D A E', 'A D G C E A', 'D A E G B D'], answer: 0 },
      { q: 'What does a capo do?', options: ['Tunes the guitar', 'Raises the pitch by clamping strings', 'Adds distortion', 'Holds the pick'], answer: 1 },
      { q: 'Which scale is most common for blues/rock solos?', options: ['Major scale', 'Minor pentatonic', 'Chromatic scale', 'Harmonic minor'], answer: 1 },
    ],
    resources: [
      { title: 'JustinGuitar (YouTube)', type: 'video', url: 'https://www.youtube.com/@JustinGuitar', duration: '1000+ lessons' },
      { title: 'Fender Play', type: 'docs', url: 'https://www.fender.com/play', duration: 'Subscription' },
      { title: 'Ultimate Guitar Tabs', type: 'docs', url: 'https://www.ultimate-guitar.com/', duration: 'Reference' },
    ]
  },

  'ui-ux-design': {
    name: 'UI/UX Design',
    icon: '🎨',
    weeks: [
      { theme: 'Design Thinking & Research', desc: 'UX fundamentals, user research, and problem definition.', tasks: [
        t('What is UX Design?', 'Understand the difference between UI and UX. The design thinking framework.', 40, 'learn'),
        t('User Research Methods', 'Surveys, interviews, personas, empathy maps.', 55, 'learn'),
        t('Competitive Analysis', 'Analyze 3 competitor apps in a chosen domain.', 50, 'practice'),
        t('Problem Statement & User Stories', 'Write HMW statements and user stories for your project.', 45, 'practice'),
        t('Create 2 User Personas', 'Build detailed personas with goals, frustrations, and scenarios.', 60, 'build'),
      ]},
      { theme: 'Wireframing & Prototyping', desc: 'Low-fi wireframes, Figma basics, and information architecture.', tasks: [
        t('Information Architecture', 'Site maps, card sorting, navigation patterns.', 45, 'learn'),
        t('Figma Setup & Basics', 'Frames, layers, components, auto-layout fundamentals.', 55, 'learn'),
        t('Low-Fidelity Wireframes', 'Sketch 5+ screens for your app using basic shapes.', 60, 'practice'),
        t('Interactive Prototype', 'Link wireframes into a clickable prototype in Figma.', 50, 'practice'),
        t('Usability Test Your Wireframes', 'Test with 3 people, document findings and iterations.', 70, 'build'),
      ]},
      { theme: 'Visual Design & UI', desc: 'Color, typography, components, and design systems.', tasks: [
        t('Color Theory for UI', 'Color psychology, accessible palettes, contrast ratios (WCAG).', 45, 'learn'),
        t('Typography for Screens', 'Type scale, pairing fonts, readability best practices.', 40, 'learn'),
        t('Design System Basics', 'Create tokens, reusable components, and variants in Figma.', 65, 'practice'),
        t('High-Fidelity Mockups', 'Transform wireframes into polished, pixel-perfect designs.', 90, 'build'),
      ]},
      { theme: 'Portfolio Case Study', desc: 'Document your process and build a design portfolio.', tasks: [
        t('Write Your Case Study', 'Problem, process, solution, results. Tell the design story.', 60, 'learn'),
        t('Micro-interactions & Motion', 'Design hover states, transitions, and loading animations.', 55, 'practice'),
        t('Design Portfolio Page', 'Create a portfolio layout showcasing your case study.', 80, 'build'),
        t('Get Feedback & Iterate', 'Share on design communities, gather feedback, refine.', 45, 'practice'),
      ]},
    ],
    challenges: [
      { q: 'What does "UX" stand for?', options: ['User Experience', 'Universal Exchange', 'User Extension', 'Unified Experience'], answer: 0 },
      { q: 'What is the minimum contrast ratio for normal text (WCAG AA)?', options: ['2:1', '3:1', '4.5:1', '7:1'], answer: 2 },
      { q: 'What is a "persona" in UX design?', options: ['A real user', 'A fictional representation of a user type', 'A wireframe', 'A design pattern'], answer: 1 },
    ],
    resources: [
      { title: 'Google UX Design Certificate', type: 'video', url: 'https://www.coursera.org/professional-certificates/google-ux-design', duration: '6 months' },
      { title: 'Laws of UX', type: 'docs', url: 'https://lawsofux.com/', duration: 'Reference' },
      { title: 'Figma YouTube Channel', type: 'video', url: 'https://www.youtube.com/@Figma', duration: '200+ videos' },
    ]
  },

  'photography': {
    name: 'Photography',
    icon: '📸',
    weeks: [
      { theme: 'Camera Fundamentals', desc: 'Exposure triangle, shooting modes, and basic composition.', tasks: [
        t('Understanding Your Camera', 'Modes, menus, sensor size, lenses explained.', 40, 'learn'),
        t('The Exposure Triangle', 'Aperture, shutter speed, ISO and how they work together.', 55, 'learn'),
        t('Aperture & Depth of Field', 'Practice shooting at f/1.8 vs f/11. See the difference.', 50, 'practice'),
        t('Shutter Speed & Motion', 'Freeze action vs motion blur. Shoot at 1/1000 and 1/15.', 50, 'practice'),
        t('Shoot 20 Photos', 'Go outside and shoot 20 intentional photos using manual mode.', 60, 'build'),
      ]},
      { theme: 'Composition & Light', desc: 'Rules of composition, natural light, and golden hour.', tasks: [
        t('Rule of Thirds & Leading Lines', 'Apply classic composition rules. Analyze famous photos.', 45, 'learn'),
        t('Natural Light Mastery', 'Golden hour, blue hour, overcast light, window light.', 50, 'learn'),
        t('Framing & Perspective', 'Use foreground elements, low angles, and reflections.', 45, 'practice'),
        t('Golden Hour Photo Walk', 'Shoot 15 photos during golden hour using composition rules.', 75, 'build'),
      ]},
      { theme: 'Editing & Post-Processing', desc: 'Lightroom basics, color grading, and developing your style.', tasks: [
        t('Lightroom Basics', 'Import, exposure, white balance, tone curve essentials.', 55, 'learn'),
        t('Color Grading & HSL', 'Create mood with color. Understand split toning and HSL sliders.', 50, 'practice'),
        t('Develop a Preset', 'Create your own signature look as a Lightroom preset.', 45, 'practice'),
        t('Edit 10 Photos to Portfolio Quality', 'Select and edit your best 10 shots.', 90, 'build'),
      ]},
      { theme: 'Portfolio & Sharing', desc: 'Curate, export, and share your photography.', tasks: [
        t('Curating Your Best Work', 'Select your 15 strongest images. Learn to self-critique.', 40, 'learn'),
        t('Export for Web & Print', 'Resolution, color space, file formats for different uses.', 35, 'learn'),
        t('Build an Online Gallery', 'Create a simple portfolio site or Instagram grid.', 60, 'build'),
        t('Photo Challenge: Tell a Story', 'Shoot a 5-photo series that tells a narrative.', 90, 'build'),
      ]},
    ],
    challenges: [
      { q: 'What three settings make up the "exposure triangle"?', options: ['Aperture, Shutter Speed, ISO', 'Focus, Zoom, Flash', 'Brightness, Contrast, Saturation', 'White Balance, Exposure, Metering'], answer: 0 },
      { q: 'A lower f-number (e.g., f/1.8) means:', options: ['Deeper depth of field', 'Shallower depth of field (more blur)', 'Darker image', 'Wider angle'], answer: 1 },
      { q: 'What time of day is "golden hour"?', options: ['Noon', 'Shortly after sunrise or before sunset', 'Midnight', 'Any time with clouds'], answer: 1 },
    ],
    resources: [
      { title: 'Peter McKinnon (YouTube)', type: 'video', url: 'https://www.youtube.com/@PeterMcKinnon', duration: '500+ videos' },
      { title: 'Cambridge in Colour', type: 'docs', url: 'https://www.cambridgeincolour.com/', duration: 'Reference' },
      { title: 'Adobe Lightroom Tutorials', type: 'video', url: 'https://www.youtube.com/@AdobeLightroom', duration: '100+ videos' },
    ]
  },
};

/** Get all skill keys */
export function getSkillKeys() {
  return Object.keys(SKILL_TEMPLATES);
}

/** Get a skill template by key */
export function getSkill(key) {
  return SKILL_TEMPLATES[key] || null;
}

/** Suggest skills matching a search term */
export function searchSkills(query) {
  const q = query.toLowerCase();
  return Object.entries(SKILL_TEMPLATES)
    .filter(([key, s]) => s.name.toLowerCase().includes(q) || key.includes(q))
    .map(([key, s]) => ({ key, name: s.name, icon: s.icon }));
}

/** Get a flat list of all skill names for display */
export function getSkillList() {
  return Object.entries(SKILL_TEMPLATES).map(([key, s]) => ({
    key,
    name: s.name,
    icon: s.icon,
  }));
}
