# Game

## Setup

1. `npm install` - install dependencies
2. `npm run dev` - run the app
3. `npm run format` - format project files using Prettier

## Implementation decisions

### Polygon shapes (3, 4, 5, 6 sides)

The instructions did not specify whether the polygons should be regular (equal sides and angles) or not. My first instinct was to implement them as regular polygons, but the drawn example included a rectangle (which is not regular) so I generalised the approach and generate them as random convex polygons instead. 

> Why convex only and not also concave? This was just a visual choice. In my opinion, concave polygons don't look as good in this context. That said, extending the current implementation to support them would require only a few changes.
