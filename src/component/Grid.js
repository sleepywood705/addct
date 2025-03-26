import "./Grid.scss";

export function Grid() {
  return (
    <section id="Grid">
      {Array(12).fill(null).map((_, index) => (
        <div key={index}></div>
      ))}
    </section>
  );
}
