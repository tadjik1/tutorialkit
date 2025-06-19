import React from 'react';
import Dialog from './Dialog.js';

type StepStatus = 'waiting' | 'active' | 'done' | 'failed';

interface ProgressStepProps {
  label: string;
  status: StepStatus;
}

function getStepStatus({
  stepNumber,
  currentStep,
  submittingError,
}: {
  stepNumber: number;
  currentStep: number;
  submittingError: boolean;
}): StepStatus {
  if (submittingError && currentStep === stepNumber) return 'failed';
  if (currentStep > stepNumber) return 'done';
  if (currentStep === stepNumber) return 'active';
  return 'waiting';
}

function ProgressStep({ label, status }: ProgressStepProps) {
  let iconClass = '';
  if (status === 'failed') {
    iconClass = 'i-ph-x-circle-duotone text-red-500';
  } else if (status === 'done') {
    iconClass = 'i-ph-check-circle-duotone text-green-500';
  } else if (status === 'active') {
    iconClass = 'i-ph-spinner-gap-duotone animate-spin text-blue-500';
  } else {
    iconClass = 'i-ph-clock-duotone text-gray-400';
  }

  let textClasses = '';
  if (status === 'failed') {
    textClasses = 'text-red-600 font-medium';
  } else if (status === 'done') {
    textClasses = 'text-green-600 font-medium';
  } else if (status === 'active') {
    textClasses = 'text-blue-600 font-medium';
  } else {
    textClasses = 'text-gray-600 font-medium';
  }
  return (
    <div className="flex items-center gap-3 py-1 px-2">
      <div className={iconClass + ' text-lg'} />
      <span className={textClasses}>{label}</span>
    </div>
  );
}

interface SubmitDialogProps {
  currentStep: 1 | 2 | 3;
  submittingError: boolean;
  onClose: () => void;
}

export function SubmitDialog({ currentStep, submittingError, onClose }: SubmitDialogProps) {
  // currentStep: 1 = running tests, 2 = submitting code, 3 = finished

  // If error occurred, mark only the current step visually red with a helper
  return (
    <Dialog
      title="Submitting solution"
      confirmText={currentStep === 3 ? 'Next lesson ➡️' : 'Cancel'}
      onClose={onClose}
    >
      <div className="flex flex-col gap-2 py-2">
        {/* Step 1: Running tests */}
        <div>
          <ProgressStep
            label="Running tests"
            status={getStepStatus({ stepNumber: 1, currentStep, submittingError })}
          />
          {submittingError && currentStep === 1 && (
            <div className="ml-8 mt-1 text-red-500 text-xs">
              ⚠️ Oops, something went wrong while running tests.
              <br />
              Please make sure all tests pass by running{' '}
              <span className="font-mono font-semibold">npm test</span> before submitting your code.
            </div>
          )}
        </div>
        {/* Step 2: Submitting code */}
        <div>
          <ProgressStep
            label="Submitting code"
            status={getStepStatus({ stepNumber: 2, currentStep, submittingError })}
          />
          {submittingError && currentStep === 2 && (
            <div className="ml-8 mt-1 text-red-500 text-xs">
              ⚠️ Couldn’t submit your code. Please try again in a moment!
            </div>
          )}
        </div>
        {currentStep === 3 && (
          <div className="mt-1 text-green-600 text-base flex gap-2">
            🎉 All checks passed! You’ve successfully finished the task.
            <br />
            Ready for the next challenge? Good luck!
          </div>
        )}
      </div>
    </Dialog>
  );
}
