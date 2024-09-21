import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, useVideoConfig, Audio, staticFile  } from "remotion";
 
// Main composition component
export const MyComposition = () => {

  // Title component to display the main title
  const Title: React.FC<{ title: string }> = ({ title }) => {
    const frame = useCurrentFrame();

    // Calculate the length of the text to be displayed based on the frame
    const typedLength = Math.min(Math.floor(frame / 3), title.length);

    // Slice the title to display only the calculated length
    const displayedText = title.slice(0, typedLength);

    // Interpolate opacity from 0 to 1 over the first 20 frames
    const opacity = interpolate(frame, [0, 20], [0, 1], {
      extrapolateRight: 'clamp',
    });
   
    return (
      <div 
      style={{ 
        opacity, // Set the opacity of the div based on the interpolated value
        display: 'flex', // Use flexbox for layout
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center', // Center the content vertically
        height: '100%', // Set the height to 100% of the parent
        textAlign: 'center', // Center the text
        margin: 'auto', // Center the div within its parent
        fontSize: '2em' // Set the font size to 2em
      }}
      >
      {displayedText} {/* Render the sliced title text */}
      </div>
    );
  };

  // Subtitle component to display the subtitle
  const Subtitle: React.FC<{ subtitle: string }> = ({ subtitle }) => {
    const frame = useCurrentFrame();
  
    // Interpolate opacity from 0 to 1 over the first 20 frames
    const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div 
      style={{ 
        opacity, // Set the opacity of the div based on the interpolated value
        display: 'flex', // Use flexbox for layout
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center', // Center the content vertically
        height: '100%', // Set the height to 100% of the parent
        fontSize: '1em', // Set the font size to 1em
        margin: 'auto', // Center the div within its parent
        textAlign: 'center', // Center the text
        marginTop: '300px' // Add a top margin of 300px
      }}
    >
      {subtitle} {/* Render the subtitle text */}
    </div>
  );
  };
  

const ParticleEffect = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

   const numParticles = 100; // Number of particles
  const particles = Array.from({ length: numParticles }).map(() => ({
    x: Math.random() * width, // Random x position
    y: Math.random() * height, // Random y position
    radius: Math.random() * 6 + 3, // Random radius between 3 and 9
    color: `hsl(${Math.random() * 360}, 50%, 50%)`, // Random color
    velocity: {
      x: (Math.random() - 0.5) * 1, // Random x velocity
      y: (Math.random() - 0.5) * 2 // Random y velocity
    }
  }));

  const updateParticles = () => {
    // Map over each particle in the particles array
    return particles.map(particle => {
      // Calculate the new x and y positions based on the current velocity
      let newX = particle.x + particle.velocity.x;
      let newY = particle.y + particle.velocity.y;
  
      // Check if the new x position is outside the horizontal boundaries
      // If so, reverse the x velocity to bounce back
      if (newX + particle.radius >= width || newX - particle.radius <= 0) {
        particle.velocity.x *= -1;
      }
  
      // Check if the new y position is outside the vertical boundaries
      // If so, reverse the y velocity to bounce back
      if (newY + particle.radius >= height || newY - particle.radius <= 0) {
        particle.velocity.y *= -1;
      }
  
      // Return a new particle object with updated x and y positions
      return { ...particle, x: newX, y: newY };
    });
  };

  const updatedParticles = updateParticles(); // Update the particles

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
      {updatedParticles.map((particle, index) => (
        <div
          key={index} // Unique key for each particle
          style={{
            position: 'absolute', // Position each particle absolutely
            left: particle.x, // Set the x position of the particle
            top: particle.y, // Set the y position of the particle
            width: particle.radius, // Set the width of the particle
            height: particle.radius, // Set the height of the particle
            backgroundColor: particle.color, // Set the background color of the particle
            borderRadius: '50%', // Make the particle a circle
            pointerEvents: 'none' // Disable pointer events for the particle
          }}
        />
      ))}
    </div>
  );
};

const SwirlEffect = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  const numCircles = 10; // Number of circles
  const circles = Array.from({ length: numCircles }).map(() => ({
    x: Math.random() * width, // Random x position
    y: Math.random() * height, // Random y position
    radius: Math.random() * 50 + 10, // Random radius between 10 and 60
    color: `hsl(${Math.random() * 360}, 50%, 50%)` // Random color
  }));

  const updateCircles = () => {
    // Map over each circle in the circles array
    return circles.map(circle => {
      const angle = frame / 400; // Calculate the angle based on the frame
      const newX = circle.x + Math.cos(angle) * 0.5; // Calculate the new x position
      const newY = circle.y + Math.sin(angle) * 0.5; // Calculate the new y position

      // Return a new circle object with updated x and y positions
      return { ...circle, x: newX, y: newY };
    });
  };

  const updatedCircles = updateCircles(); // Update the circles

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
      {updatedCircles.map((circle, index) => (
        <div
          key={index} // Unique key for each circle
          style={{
            position: 'absolute', // Position each circle absolutely
            left: circle.x, // Set the x position of the circle
            top: circle.y, // Set the y position of the circle
            width: circle.radius, // Set the width of the circle
            height: circle.radius, // Set the height of the circle
            backgroundColor: circle.color, // Set the background color of the circle
            borderRadius: '50%', // Make the circle round
            pointerEvents: 'none' // Disable pointer events for the circle
          }}
        />
      ))}
    </div>
  );
};

const GradientCircles = () => {
  const frame = useCurrentFrame(); // Get the current frame

  const numGradients = 5; // Number of gradient circles

  const opacity = Math.abs(Math.sin((frame / 50) * Math.PI)); // Calculate opacity based on the frame

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {[...Array(numGradients)].map((_, index) => (
        <div
          key={index}
          style={{
            width: '200px', // Set width of the gradient circle
            height: '200px', // Set height of the gradient circle
            background: `radial-gradient(circle at center, hsl(${(frame + index * 50) % 360}, 50%, 50%) 0%, transparent 60%)`, // Set radial gradient background
            borderRadius: '50%', // Make the div a circle
            opacity, // Set the calculated opacity
            transition: 'opacity 1s ease-in-out', // Smooth transition for opacity
            animation: 'pulse 2s infinite', // Pulse animation
          }}
        />
      ))}
    </div>
  );
};

const Waver = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  const amplitude = height / 6; // Set the amplitude of the wave
  const frequency = 0.01; // Set the frequency of the wave

  // Function to calculate the y position of a point based on x and the current frame
  const calculateY = (x: number, frame: number) => {
    return amplitude * Math.sin(frequency * x + (frame / 10));
  };

  // Generate an array of points for the wave
  const points = Array.from({ length: width }).map((_, index) => {
    return { x: index, y: calculateY(index, frame) + height / 2 };
  });

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: '-30%' }}>
      <path
        // Create a path string from the points array
        d={`M 0 ${height / 2} ` + points.map(point => `L ${point.x} ${point.y}`).join(' ')}
        fill="none" // No fill color
        stroke="rgba(173, 216, 230, 0.5)" // Light blue stroke color with opacity
        strokeWidth="2" // Set the stroke width
      />
    </svg>
  );
};

const WaveEffect = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  // Function to generate a random color with 50% opacity
  const randomColor = () => {
    const r = Math.floor(Math.random() * 256); // Random red value
    const g = Math.floor(Math.random() * 256); // Random green value
    const b = Math.floor(Math.random() * 256); // Random blue value
    return `rgba(${r}, ${g}, ${b}, 0.5)`; // Return the color in rgba format
  };

  const amplitude = height / 6; // Set the amplitude of the wave
  const frequency = 0.01; // Set the frequency of the wave

  // Function to calculate the y position of a point based on x and the current frame
  const calculateY = (x: number, frame: number) => {
    return amplitude * Math.sin(frequency * x + frame / 10);
  };

  // Generate an array of points for the wave
  const points = Array.from({ length: width }).map((_, index) => {
    return { x: index, y: calculateY(index, frame) + height / 2 };
  });

  // Create a path string from the points array
  const path = `M 0 ${height / 2} ` + points.map(point => `L ${point.x} ${point.y}`).join(' ');

  const strokeColor = randomColor(); // Get a random stroke color

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: '30%' }}>
      <path
        d={path} // Set the path data
        fill="none" // No fill color
        stroke={strokeColor} // Set the stroke color
        strokeWidth="2" // Set the stroke width
      />
    </svg>
  );
};

const TunnelBackground = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  const angle = frame / 100; // Calculate the rotation angle based on the frame
  const centerX = width / 2; // Calculate the center x position
  const centerY = height / 2; // Calculate the center y position

  return (
    <svg
      style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }} // Set SVG styles
      viewBox={`0 0 ${width} ${height}`} // Set the viewBox to match video dimensions
    >
      <defs>
        <radialGradient id="metallic-blue-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"> // Define a radial gradient
          <stop offset="0%" stopColor="#192550" /> // Gradient start color
          <stop offset="100%" stopColor="#0e141e" /> // Gradient end color
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#metallic-blue-gradient)" /> // Fill the background with the gradient
      {[...Array(20)].map((_, index) => {
        const ellipseWidth = 100 + index * 20; // Calculate ellipse width
        const ellipseHeight = 50 + index * 10; // Calculate ellipse height
        const rotation = angle + (index * Math.PI) / 10; // Calculate rotation for each ellipse
        const x = centerX + Math.cos(rotation) * (width / 3); // Calculate x position
        const y = centerY + Math.sin(rotation) * (height / 3); // Calculate y position
        return (
          <ellipse
            key={index}
            cx={x}
            cy={y}
            rx={ellipseWidth}
            ry={ellipseHeight}
            fill="none"
            stroke="#0e141e" // Set stroke color
            strokeWidth="2" // Set stroke width
            style={{ animation: `pulse 2s infinite`, animationDelay: `${index * 0.2}s` }} // Set animation style
          />
        );
      })}
    </svg>
  );
};



const GlowingCirclesEffect = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  const numCircles = 10; // Number of circles
  const circleRadius = 50; // Radius of each circle
  const circleSpacing = width / numCircles; // Spacing between circles

  // Function to calculate the position of each circle
  const calculateCirclePosition = (index: number) => {
    const x = (index + 1) * circleSpacing; // Calculate x position
    const y = Math.cos(frame / 20 + index) * (height / 3) + height / 2; // Calculate y position
    return { x, y }; // Return the position
  };

  // Generate an array of circle elements
  const circles = Array.from({ length: numCircles }).map((_, index: number) => {
    const { x, y } = calculateCirclePosition(index); // Get the position of the circle
    return (
      <circle
        key={index} // Unique key for each circle
        cx={x} // Set x position
        cy={y} // Set y position
        r={circleRadius} // Set radius
        fill="none" // No fill color
        stroke="#ffffff" // White stroke color
        strokeWidth="2" // Set stroke width
        style={{
          animation: `glow 2s infinite alternate`, // Glow animation
          animationDelay: `${index * 0.2}s`, // Delay for each circle
        }}
      />
    );
  });

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: '-15%' }}>
      {circles} {/* Render the circles */}
    </svg>
  );
};

const GlowingColouredCirclesEffect = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  const numCircles = 10; // Number of circles
  const circleRadius = 50; // Radius of each circle
  const circleSpacing = width / numCircles; // Spacing between circles

  // Function to generate a random color
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256); // Random red value
    const g = Math.floor(Math.random() * 256); // Random green value
    const b = Math.floor(Math.random() * 256); // Random blue value
    return `rgb(${r}, ${g}, ${b})`; // Return the color in rgb format
  };

  // Function to calculate the position of each circle
  const calculateCirclePosition = (index: number) => {
    const x = (index + 1) * circleSpacing; // Calculate x position
    const y = Math.sin(frame / 20 + index) * (height / 3) + height / 2; // Calculate y position
    return { x, y }; // Return the position
  };

  // Generate an array of circle elements
  const circles = Array.from({ length: numCircles }).map((_, index: number) => {
    const { x, y } = calculateCirclePosition(index); // Get the position of the circle
    const color = getRandomColor(); // Get a random color for the circle
    return (
      <circle
        key={index} // Unique key for each circle
        cx={x} // Set x position
        cy={y} // Set y position
        r={circleRadius} // Set radius
        fill="none" // No fill color
        stroke={color} // Set stroke color
        strokeWidth="2" // Set stroke width
        style={{
          animation: `glow 2s infinite alternate`, // Glow animation
          animationDelay: `${index * 0.2}s`, // Delay for each circle
        }}
      />
    );
  });

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: '15%' }}>
      {circles} {/* Render the circles */}
    </svg>
  );
};

const Music: React.FC = () => {
  return <Audio src={staticFile("PiecesVideo.mp3")} />; // Renders an Audio component that plays the "PiecesVideo.mp3" file
};

const ExplosiveBackground: React.FC = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  return (
    <svg
      style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }} // Set SVG styles
      viewBox={`0 0 ${width} ${height}`} // Set the viewBox to match video dimensions
    >
      {[...Array(100)].map((_, index) => {
        const circleSize = Math.random() * 200 + 50; // Random circle size between 50 and 250
        const x = Math.random() * width; // Random x position within the video width
        const y = Math.random() * height; // Random y position within the video height
        return (
          <circle
            key={index} // Unique key for each circle
            cx={x} // Set x position
            cy={y} // Set y position
            r={circleSize} // Set radius
            fill={`hsl(${(frame + index * 30) % 360}, 70%, 50%)`} // Set fill color with hue based on frame and index
            style={{ animation: `pulse 20s infinite`, animationDelay: `${index * 0.9}s` }} // Set animation style
          />
        );
      })}
    </svg>
  );
};

const VortexEffect: React.FC = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  const numLines = 100; // Number of lines in the vortex
  const lineWidth = 3; // Width of each line
  const center = { x: width / 2, y: height / 2 }; // Center of the vortex
  const radius = Math.min(width, height) / 2; // Radius of the vortex

  return (
    <svg width={width} height={height}> {/* SVG container for the vortex */}
      {[...Array(numLines)].map((_, index) => {
        const angle = (index / numLines) * 2 * Math.PI; // Calculate the angle for each line
        const x1 = center.x + Math.cos(angle) * radius; // Calculate the starting x position of the line
        const y1 = center.y + Math.sin(angle) * radius; // Calculate the starting y position of the line
        const x2 = center.x + Math.cos(angle + frame / 100) * radius; // Calculate the ending x position of the line
        const y2 = center.y + Math.sin(angle + frame / 100) * radius; // Calculate the ending y position of the line

        return (
          <line
            key={index} // Unique key for each line
            x1={x1} // Set starting x position
            y1={y1} // Set starting y position
            x2={x2} // Set ending x position
            y2={y2} // Set ending y position
            strokeWidth={lineWidth} // Set line width
            stroke={`hsl(${(frame * 2 + index * 20) % 360}, 70%, 50%)`} // Set line color with hue based on frame and index
          />
        );
      })}
    </svg>
  );
};


const BackgroundEffect: React.FC = () => {
  const { width, height } = useVideoConfig(); // Get video dimensions
  const frame = useCurrentFrame(); // Get the current frame

  const angleIncrement = (2 * Math.PI) / 20; // Calculate the angle increment for each line
  const centerX = width / 2; // Calculate the center x position
  const centerY = height / 2; // Calculate the center y position

  return (
    <svg
      style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }} // Set SVG styles
      viewBox={`0 0 ${width} ${height}`} // Set the viewBox to match video dimensions
    >
      <defs>
        <radialGradient id="metallic-blue-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%"> // Define a radial gradient
          <stop offset="0%" stopColor="#192550" /> // Gradient start color
          <stop offset="100%" stopColor="#0e141e" /> // Gradient end color
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#metallic-blue-gradient)" /> // Fill the background with the gradient
      {[...Array(20)].map((_, index) => {
        const length = 100 + index * 20; // Calculate the length of each line
        const rotation = angleIncrement * index + (frame / 100) * index; // Calculate the rotation for each line
        const x1 = centerX + Math.cos(rotation) * (width / 3); // Calculate the starting x position of the line
        const y1 = centerY + Math.sin(rotation) * (height / 3); // Calculate the starting y position of the line
        const x2 = centerX + Math.cos(rotation) * (width / 3 + length); // Calculate the ending x position of the line
        const y2 = centerY + Math.sin(rotation) * (height / 3 + length); // Calculate the ending y position of the line
        return (
          <line
            key={index} // Unique key for each line
            x1={x1} // Set starting x position
            y1={y1} // Set starting y position
            x2={x2} // Set ending x position
            y2={y2} // Set ending y position
            stroke="#0e141e" // Set stroke color
            strokeWidth="2" // Set stroke width
            style={{ animation: `pulse 2s infinite`, animationDelay: `${index * 0.2}s` }} // Set animation style
          />
        );
      })}
    </svg>
  );
};


  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 100,
				color: "white",
      }}
    >
      <Sequence durationInFrames={200} name="IntroTitle">
        {/* IntroTitle */}
        <Title title="Quest For Harmony" />
      </Sequence>
      <Sequence from={220} durationInFrames={220} name="IntroHarmony">
        {/* IntroHarmony */}
        <Title title="What is Harmony?" />
      </Sequence> 
      <Sequence from={450} durationInFrames={220} name="IntroHappiness">
        {/* IntroHappiness */}
        <Title title="Is it happiness?" />
      </Sequence>   
      <Sequence from={680} durationInFrames={180} name="IntroPeace">
        {/* IntroPeace */}
        <Title title="Is it peace?" />
      </Sequence>  
      <Sequence from={870} durationInFrames={300} name="Introthis">
        {/* Introthis */}
        <Title title="Or is it this?" />
      </Sequence>  
        {/* IntroCreated */}
      {<Sequence from={50} durationInFrames={150} name="IntroCreated">
        <Subtitle subtitle="Created by Abubakar Bunamay"/>
      </Sequence>  }
      <Sequence from={1230} durationInFrames={2170} name="ParticleEffect">
        {/* ParticleEffect */}
        <ParticleEffect />
      </Sequence>
      <Sequence from={0} durationInFrames={9000} name="ShapeTunnelBackground">
        {/* ShapeTunnelBackground */}
        <TunnelBackground />
      </Sequence>
      <Sequence from={1400} durationInFrames={2000} name="SwirlEffect">
        {/* SwirlEffect */}
        <SwirlEffect />
      </Sequence>
      <Sequence from={4200} durationInFrames={3730} name="GradientCircles">
        {/* GradientCircles */}
        <GradientCircles />
      </Sequence>
      <Sequence from={4200} durationInFrames={3730} name="Waver">
        {/* Waver */}
        <Waver />
      </Sequence>
      <Sequence from={4420} durationInFrames={3510} name="DoubleWaver">
        {/* DoubleWaver */}
        <WaveEffect />
      </Sequence>
      <Sequence from={5050} durationInFrames={2880} name="GlowingCircle">
        {/* GlowingCircle */}
        <GlowingCirclesEffect />
      </Sequence>
      <Sequence from={6130} durationInFrames={1800} name="GlowingCircleEffect">
        {/* GlowingCircleEffect */}
        <GlowingColouredCirclesEffect />
      </Sequence>
      <Sequence from={3400} durationInFrames={800} name="ExplosiveCircles">
        {/* ExplosiveCircles */}
        <ExplosiveBackground/>
      </Sequence>
      <Sequence from={4200} durationInFrames={5000} name="PlainBackground">
        {/* PlainBackground */}
        <BackgroundEffect/>
      </Sequence>
      <Sequence from={7950} durationInFrames={3000} name="VortexEffect">
        {/* VortexEffect */}
        <VortexEffect />
      </Sequence>
      <Sequence from={0} durationInFrames={9000} name="Music">
        {/* Music */}
        <Music/>
      </Sequence>
		</AbsoluteFill>
  );
};