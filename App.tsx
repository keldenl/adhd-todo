import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import KanbanView from './components/KanbanView';
import BinderView from './components/BinderView';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import { generateArtifactImage } from './services/geminiService';
import type { Task, View, Artifact, ElementType } from './types';

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const valueToStore = JSON.stringify(storedValue);
      window.localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}


const App = () => {
  const [view, setView] = useState<View>('BOARD');
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [artifacts, setArtifacts] = useLocalStorage<Artifact[]>('artifacts', []);
  const [activeTask, setActiveTask] = useLocalStorage<Task | null>('activeTask', null);
  const [completedTask, setCompletedTask] = useLocalStorage<Task | null>('completedTask', null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lon: number} | undefined>(undefined);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        console.warn("Could not get geolocation", error);
      }
    );
  }, []);

  const handleAddTask = (title: string, elementType: ElementType, effort: number) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      elementType,
      effort,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    setIsModalOpen(false);
  };

  const handleStartTask = (task: Task) => {
    if (activeTask || completedTask) {
      alert("Another task is already in progress. Please complete it first.");
      return;
    }
    setTasks(prev => prev.filter(t => t.id !== task.id));
    setActiveTask(task);
  };

  const handleCompleteFocus = () => {
    if (!activeTask) return;
    setCompletedTask(activeTask);
    setActiveTask(null);
  };

  const handleCreateArtifact = async (artisticNudge: { mood: string; color: string; }) => {
    if (!completedTask) return;
    
    const context = {
      location: currentLocation,
      timestamp: new Date().toISOString(),
    };
    
    try {
      const prompt = `...`; // Prompt is generated within the service
      const imageUrl = await generateArtifactImage(completedTask, artisticNudge, context);
      
      const newArtifact: Artifact = {
        id: `artifact-${Date.now()}`,
        task: completedTask,
        imageUrl,
        createdAt: new Date().toISOString(),
        metadata: {
          prompt,
          userMood: artisticNudge.mood,
          userColor: artisticNudge.color,
          context,
        },
      };

      setArtifacts(prev => [newArtifact, ...prev]);
      setCompletedTask(null);
      setView('BINDER');
    } catch (error) {
      console.error(error);
      alert("Failed to create artifact. The task has been returned to your deck.");
      setTasks(prev => [...prev, completedTask]);
      setCompletedTask(null);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'BOARD':
        return <KanbanView 
                  tasks={tasks} 
                  activeTask={activeTask}
                  completedTask={completedTask}
                  onStartTask={handleStartTask}
                  onCompleteFocus={handleCompleteFocus}
                  onCreateArtifact={handleCreateArtifact}
                />;
      case 'BINDER':
        return <BinderView artifacts={artifacts} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-0)' }}>
      <Sidebar view={view} setView={setView} onAddTask={() => setIsModalOpen(true)} />
      <main style={{ flex: 1, overflow: 'hidden' }}>
        {renderView()}
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onSubmit={handleAddTask} />
      </Modal>
    </div>
  );
};

export default App;
