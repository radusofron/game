# Game

## Setup

1. `npm install` - install dependencies
2. `npm run dev` - run the app
3. `npm run format` - format project files using Prettier

## Implementation decisions

### Polygon shapes (3, 4, 5, 6 sides)

The instructions did not specify whether the polygons should be regular (equal sides and angles) or not. My first instinct was to implement them as regular polygons, but the drawn example included a rectangle (which is not regular) so I generalised the approach and generate them as random convex polygons instead.

> Why convex only and not also concave? This was just a visual choice. In my opinion, concave polygons don't look as good in this context. That said, extending the current implementation to support them would require only a few changes.

Also, from my understanding, this decision satisfies the bonus requirement of generating a genuinely random irregular shape (at least partially, since only convex polygons are generated, concave ones not being included). More on this bonus requirement, it was also a bit unclear to me whether it should apply only to click-generated shapes or to all shapes. In this implementation, it is applied to all generated shapes.

### Shape visibility

The instructions did not specify what should happen when a shape is generated near the left or right edge of the screen. I decided to always keep shapes fully visible and never partially clipped, as follows:
* Randomly generated shapes are placed at a random position within the valid range (computed based on the shape width)
* Click-generated shapes are placed at the nearest valid position that keeps them fully visible
