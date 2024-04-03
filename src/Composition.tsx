import { AbsoluteFill, useCurrentFrame, interpolate, Sequence, useVideoConfig, Audio, staticFile  } from "remotion";
 
export const MyComposition = () => {

	 const Title: React.FC<{ title: string }> = ({ title }) => {
		const frame = useCurrentFrame();

		const typedLength = Math.min(Math.floor(frame / 3), title.length);

		const displayedText = title.slice(0, typedLength);

		const opacity = interpolate(frame, [0, 20], [0, 1], {
			extrapolateRight: 'clamp',
		});
	 
		return (
			<div style={{ 
				opacity, 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				height: '100%', 
				textAlign: 'center',
				margin: 'auto', 
				fontSize: '2em' 
			}}>
				{displayedText}
			</div>
		);
	};

	const Subtitle: React.FC<{ subtitle: string }> = ({ subtitle }) => {
		const frame = useCurrentFrame();
	
		const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
	
		return (
			<div style={{ 
				opacity, 
				display: 'flex', 
				justifyContent: 'center', 
				alignItems: 'center', 
				height: '100%', 
				fontSize: '1em',
				margin: 'auto', 
				textAlign: 'center', 
				marginTop: '300px' 
			}}>
				{subtitle}
			</div>
		);
	};
	

const ParticleEffect = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numParticles = 100;
  const particles = Array.from({ length: numParticles }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 6 + 3, 
    color: `hsl(${Math.random() * 360}, 50%, 50%)`,
    velocity: {
      x: (Math.random() - 0.5) * 1, 
      y: (Math.random() - 0.5) * 2
    }
  }));

  const updateParticles = () => {
    return particles.map(particle => {
      let newX = particle.x + particle.velocity.x;
      let newY = particle.y + particle.velocity.y;

      if (newX + particle.radius >= width || newX - particle.radius <= 0) {
        particle.velocity.x *= -1;
      }
      if (newY + particle.radius >= height || newY - particle.radius <= 0) {
        particle.velocity.y *= -1;
      }

      return { ...particle, x: newX, y: newY };
    });
  };

  const updatedParticles = updateParticles();

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
      {updatedParticles.map((particle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.radius,
            height: particle.radius,
            backgroundColor: particle.color,
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

const SwirlEffect = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numCircles = 10;
  const circles = Array.from({ length: numCircles }).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 50 + 10, 
    color: `hsl(${Math.random() * 360}, 50%, 50%)`
  }));

  const updateCircles = () => {
    return circles.map(circle => {
      const angle = frame / 400;  
      const newX = circle.x + Math.cos(angle) * 0.5; 
      const newY = circle.y + Math.sin(angle) * 0.5; 

      return { ...circle, x: newX, y: newY };
    });
  };

  const updatedCircles = updateCircles();

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}>
      {updatedCircles.map((circle, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: circle.x,
            top: circle.y,
            width: circle.radius,
            height: circle.radius,
            backgroundColor: circle.color,
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      ))}
    </div>
  );
};

const GradientCircles = () => {
  const frame = useCurrentFrame();

  const numGradients = 5;

  const opacity = Math.abs(Math.sin((frame / 50) * Math.PI));

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
      {[...Array(numGradients)].map((_, index) => (
        <div
          key={index}
          style={{
            width: '200px',
            height: '200px',
            background: `radial-gradient(circle at center, hsl(${(frame + index * 50) % 360}, 50%, 50%) 0%, transparent 60%)`,
            borderRadius: '50%',
            opacity,
            transition: 'opacity 1s ease-in-out',
            animation: 'pulse 2s infinite', 
          }}
        />
      ))}
    </div>
  );
};

const Waver = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const amplitude = height / 6;
  const frequency = 0.01;

  const calculateY = (x: number, frame: number) => {
    return amplitude * Math.sin(frequency * x + (frame / 10));
  };

  const points = Array.from({ length: width }).map((_, index) => {
    return { x: index, y: calculateY(index, frame) + height / 2 };
  });

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: '-30%' }}>
      <path
        d={`M 0 ${height / 2} ` + points.map(point => `L ${point.x} ${point.y}`).join(' ')}
        fill="none"
        stroke="rgba(173, 216, 230, 0.5)"
        strokeWidth="2"
      />
    </svg>
  );
};

const WaveEffect = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  const amplitude = height / 6;
  const frequency = 0.01;

  const calculateY = (x: number, frame: number) => {
    return amplitude * Math.sin(frequency * x + frame / 10);
  };

  const points = Array.from({ length: width }).map((_, index) => {
    return { x: index, y: calculateY(index, frame) + height / 2 };
  });

  const path = `M 0 ${height / 2} ` + points.map(point => `L ${point.x} ${point.y}`).join(' ');

  const strokeColor = randomColor();

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top: '30%' }}>
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};

const TunnelBackground = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const angle = frame / 100; 
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <svg
      style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <radialGradient id="metallic-blue-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#192550" />
          <stop offset="100%" stopColor="#0e141e" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#metallic-blue-gradient)" />
      {[...Array(20)].map((_, index) => {
        const ellipseWidth = 100 + index * 20; 
        const ellipseHeight = 50 + index * 10; 
        const rotation = angle + (index * Math.PI) / 10; 
        const x = centerX + Math.cos(rotation) * (width / 3); 
        const y = centerY + Math.sin(rotation) * (height / 3); 
        return (
          <ellipse
            key={index}
            cx={x}
            cy={y}
            rx={ellipseWidth}
            ry={ellipseHeight}
            fill="none"
            stroke="#0e141e" 
            strokeWidth="2"
            style={{ animation: `pulse 2s infinite`, animationDelay: `${index * 0.2}s` }}
          />
        );
      })}
    </svg>
  );
};



const GlowingCirclesEffect = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numCircles = 10;
  const circleRadius = 50;
  const circleSpacing = width / numCircles;

  const calculateCirclePosition = (index: number) => {
    const x = (index + 1) * circleSpacing;
    const y = Math.cos(frame / 20 + index) * (height / 3) + height / 2;
    return { x, y };
  };

  const circles = Array.from({ length: numCircles }).map((_, index: number) => {
    const { x, y } = calculateCirclePosition(index);
    return (
      <circle
        key={index}
        cx={x}
        cy={y}
        r={circleRadius}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        style={{
          animation: `glow 2s infinite alternate`,
          animationDelay: `${index * 0.2}s`,
        }}
      />
    );
  });

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top:'-15%' }}>
      {circles}
    </svg>
  );
};

const GlowingColouredCirclesEffect = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numCircles = 10;
  const circleRadius = 50;
  const circleSpacing = width / numCircles;

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const calculateCirclePosition = (index: number) => {
    const x = (index + 1) * circleSpacing;
    const y = Math.sin(frame / 20 + index) * (height / 3) + height / 2;
    return { x, y };
  };

  const circles = Array.from({ length: numCircles }).map((_, index: number) => {
    const { x, y } = calculateCirclePosition(index);
    const color = getRandomColor();
    return (
      <circle
        key={index}
        cx={x}
        cy={y}
        r={circleRadius}
        fill="none"
        stroke={color}
        strokeWidth="2"
        style={{
          animation: `glow 2s infinite alternate`,
          animationDelay: `${index * 0.2}s`,
        }}
      />
    );
  });

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', top:'15%' }}>
      {circles}
    </svg>
  );
};
const Music: React.FC = () => {
  return <Audio src={staticFile("PiecesVideo.mp3")} />;
};

const ExplosiveBackground: React.FC = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <svg
      style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {[...Array(100)].map((_, index) => {
        const circleSize = Math.random() * 200 + 50; 
        const x = Math.random() * width; 
        const y = Math.random() * height; 
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={circleSize}
            fill={`hsl(${(frame + index * 30) % 360}, 70%, 50%)`}
            style={{ animation: `pulse 20s infinite`, animationDelay: `${index * 0.9}s` }}
          />
        );
      })}
    </svg>
  );
};

const VortexEffect: React.FC = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const numLines = 100;
  const lineWidth = 3;
  const center = { x: width / 2, y: height / 2 };
  const radius = Math.min(width, height) / 2;

  return (
    <svg width={width} height={height}>
      {[...Array(numLines)].map((_, index) => {
        const angle = (index / numLines) * 2 * Math.PI;
        const x1 = center.x + Math.cos(angle) * radius;
        const y1 = center.y + Math.sin(angle) * radius;
        const x2 = center.x + Math.cos(angle + frame / 100) * radius;
        const y2 = center.y + Math.sin(angle + frame / 100) * radius;

        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            strokeWidth={lineWidth}
            stroke={`hsl(${(frame * 2 + index * 20) % 360}, 70%, 50%)`}
          />
        );
      })}
    </svg>
  );
};


const BackgroundEffect: React.FC = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const angleIncrement = (2 * Math.PI) / 20; 
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <svg
      style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', zIndex: -1 }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <radialGradient id="metallic-blue-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#192550" />
          <stop offset="100%" stopColor="#0e141e" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill="url(#metallic-blue-gradient)" />
      {[...Array(20)].map((_, index) => {
        const length = 100 + index * 20; 
        const rotation = angleIncrement * index + (frame / 100) * index; 
        const x1 = centerX + Math.cos(rotation) * (width / 3); 
        const y1 = centerY + Math.sin(rotation) * (height / 3); 
        const x2 = centerX + Math.cos(rotation) * (width / 3 + length); 
        const y2 = centerY + Math.sin(rotation) * (height / 3 + length); 
        return (
          <line
            key={index}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#0e141e" 
            strokeWidth="2"
            style={{ animation: `pulse 2s infinite`, animationDelay: `${index * 0.2}s` }}
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
        <Title title="Quest For Harmony" />
      </Sequence>
			<Sequence from={220} durationInFrames={220} name="IntroHarmony">
        <Title title="What is Harmony?" />
      </Sequence> 
			<Sequence from={450} durationInFrames={220} name="IntroHappiness">
        <Title title="Is it happiness?" />
      </Sequence>   
			<Sequence from={680} durationInFrames={180} name="IntroPeace">
        <Title title="Is it peace?" />
      </Sequence>  
			<Sequence from={870} durationInFrames={300} name="Introthis">
        <Title title="Or is it this?" />
      </Sequence>  
			<Sequence from={50} durationInFrames={150} name="IntroCreated">
        <Subtitle subtitle="Created by Abubakar Bunamay"/>
      </Sequence> 
			<Sequence from={1230} durationInFrames={2170} name="ParticleEffect">
			<ParticleEffect />
      </Sequence>
			<Sequence from={0} durationInFrames={9000} name="ShapeTunnelBackground">
			<TunnelBackground />
      </Sequence>
			<Sequence from={1400} durationInFrames={2000} name="SwirlEffect">
			<SwirlEffect />
      </Sequence>
			<Sequence from={4200} durationInFrames={3730} name="GradientCircles">
			<GradientCircles />
      </Sequence>
			<Sequence from={4200} durationInFrames={3730} name="Waver">
			<Waver />
      </Sequence>
			<Sequence from={4420} durationInFrames={3510} name="DoubleWaver">
			<WaveEffect />
      </Sequence>
			<Sequence from={5050} durationInFrames={2880} name="GlowingCircle">
			<GlowingCirclesEffect />
      </Sequence>
			<Sequence from={6130} durationInFrames={1800} name="GlowingCircleEffect">
			<GlowingColouredCirclesEffect />
      </Sequence>
			<Sequence from={3400} durationInFrames={800} name="ExplosiveCircles">
			<ExplosiveBackground/>
      </Sequence>
			<Sequence from={4200} durationInFrames={5000} name="PlainBackground">
			<BackgroundEffect/>
      </Sequence>
			<Sequence from={7950} durationInFrames={3000} name="VortexEffect">
			<VortexEffect />
      </Sequence>
			<Sequence from={0} durationInFrames={9000} name="Music">
			<Music/>
      </Sequence>
		</AbsoluteFill>
  );
};