import "./components/GlobalLoading/globalLoading.css"

export default function Loading() {
  return (
    <div className="fj-global-loading">
      <div className="fj-loader-container">
        <div className="fj-loader-orbits">
          <div className="fj-orbit-circle fj-orbit-1"></div>
          <div className="fj-orbit-circle fj-orbit-2"></div>
          <div className="fj-orbit-circle fj-orbit-3"></div>
        </div>
        <div className="fj-loader-core">
          <div className="fj-loader-circle">
            <span className="fj-loader-text">FJ</span>
          </div>
        </div>
        <div className="fj-particles-container">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="fj-particle" style={{ '--i': i }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}