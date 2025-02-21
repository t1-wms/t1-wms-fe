import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Success({ width = 120, height = 120 }) {
    return (
      <div style={{ width, height }}>
        <DotLottieReact
          src="https://lottie.host/e06bbf09-8dc1-434e-82a9-3871455b137e/XIVFUjeXvG.lottie"
          loop={false}
          autoplay
          speed={2}
        />
      </div>
    );
}

export default Success
