export default function Navbar(){
    return(
        <div className="nav">
            <nav className="navbar navbar-expand-lg ">
                <div className="space"><a className="navbar-brand" href="#">Memovies</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="las la-bars"></i>
                </button></div>
                
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">TV Shows</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">My List</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">New & Popular</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Kids</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">Popular</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Genre
                        </a>
                        <div className="dropdown-menu drop" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Horror</a>
                          <a className="dropdown-item" href="#">Romance</a>
                          <a className="dropdown-item" href="#">Thriller</a>
                          <a className="dropdown-item" href="#">Comedy</a>
                          <a className="dropdown-item" href="#">Anime</a>
                          <a className="dropdown-item" href="#">Science fiction</a>
                        </div>
                      </li>
                  </ul>
                </div>
              </nav>
        </div>
    )
}