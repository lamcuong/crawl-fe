//@ts-nocheck
export const LoadingService = {

    start: () => {
       document.getElementById('app-loading-overlay').style.display="flex"
    },
  
    stop: () => {
      document.getElementById('app-loading-overlay').style.display="none"
    }
  
  }
  
  export const AppLoading = () => {
    return (
      <div className="app-loading">
        <div className="app-loading-box">
        </div>
      </div>
    );
  }
  