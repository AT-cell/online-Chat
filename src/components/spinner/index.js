import SyncLoader from 'react-spinners/SyncLoader'

const Spinner = ({color, loading, size, overlay=true, ...prop}) => {
  return (
    <div className={overlay ? 'overlay' : ''}>
        <SyncLoader color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        {...prop}/>
    </div>
  )
}

export default Spinner