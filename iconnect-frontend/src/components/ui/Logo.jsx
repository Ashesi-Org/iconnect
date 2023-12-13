import logo from "../../assets/logo.png"

export const Logo = ({ width, height }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src={logo}
        alt="logo"
        className="object-cover"
        style={{
          width,
          height,
        }}
      />
    </div>
  );
};
