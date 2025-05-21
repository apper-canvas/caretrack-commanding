import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIcon } from '../utils/iconUtils'
import { clearActivePatient } from '../store/patientSlice'
import { toast } from 'react-toastify'
import { calculateAge } from '../data/mockData'

const PatientContextBanner = () => {
  const dispatch = useDispatch()
  const activePatient = useSelector(state => state.patient.activePatient)
  
  // Icons
  const UserIcon = getIcon('user')
  const XIcon = getIcon('x')
  const ClipboardIcon = getIcon('clipboard')
  const CalendarIcon = getIcon('calendar')
  const EditIcon = getIcon('edit')

  // Handle clearing the active patient
  const handleClearPatient = () => {
    dispatch(clearActivePatient())
    toast.info(`Patient context cleared`)
  }

  if (!activePatient) return null

  return (
    <div className="bg-primary-light/10 dark:bg-primary-dark/10 border-l-4 border-primary px-4 py-3 mb-4 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-primary-light/30 dark:bg-primary-dark/30 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-primary dark:text-primary-light" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <span className="text-primary dark:text-primary-light">Active Patient:</span>
              <span className="ml-2 text-surface-900 dark:text-surface-100">
                {activePatient.firstName} {activePatient.lastName}
              </span>
            </h3>
            
            <div className="flex items-center text-sm text-surface-600 dark:text-surface-400 mt-1">
              <span className="inline-block mr-3">Age: {calculateAge(activePatient.dob)}</span>
              <span className="inline-block mr-3">Gender: {activePatient.gender}</span>
              <span className={`badge ${activePatient.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                {activePatient.status}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Link to={`/patients/records/${activePatient.id}`} className="btn btn-outline btn-sm flex items-center">
            <ClipboardIcon className="w-4 h-4 mr-1" /> Records
          </Link>
          <Link to={`/appointments?patientId=${activePatient.id}`} className="btn btn-outline btn-sm flex items-center">
            <CalendarIcon className="w-4 h-4 mr-1" /> Schedule
          </Link>
          <button onClick={handleClearPatient} className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700" title="Clear patient context">
            <XIcon className="w-5 h-5 text-surface-500 dark:text-surface-400" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PatientContextBanner