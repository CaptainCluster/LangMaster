const Panel = ({ header, text }: { header: string; text: string }) => {
  return (
    <div className="text-black p-1 bg-[var(--color-panel)] rounded-lg shadow-md transform">
      <h4 className="text-white text-center py-1">{header}</h4>
      <div className="bg-white min-h-[40vh] p-3 rounded-lg">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Panel;
