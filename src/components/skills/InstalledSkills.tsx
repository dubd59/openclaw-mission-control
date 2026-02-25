import React, { useState } from 'react';
import { Package, RefreshCw, Settings, Trash2 } from 'lucide-react';
import { useSkillStore } from '../../store/skillStore';

const InstalledSkills: React.FC = () => {
  const { skills, enableSkill, disableSkill, uninstallSkill, updateSkill } = useSkillStore();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggle = (skillId: string, currentEnabled: boolean) => {
    if (currentEnabled) {
      disableSkill(skillId);
      return;
    }
    enableSkill(skillId);
  };

  const handleUpdate = async (skillId: string) => {
    setUpdatingId(skillId);
    await updateSkill(skillId);
    setTimeout(() => setUpdatingId(null), 700);
  };

  const handleUninstall = async (skillId: string, skillName: string) => {
    if (window.confirm(`Are you sure you want to uninstall ${skillName}?`)) {
      await uninstallSkill(skillId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Installed Skills</h2>
        <span className="text-sm text-gray-400">{skills.length} skills installed</span>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="rounded-xl border border-gray-800 bg-dark-200 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  <span className="rounded-full bg-dark-300 px-2 py-1 text-xs text-gray-400">v{skill.version}</span>
                </div>
                <p className="mt-1 text-sm text-gray-400">by {skill.author}</p>
              </div>
              <button
                onClick={() => handleToggle(skill.id, skill.enabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  skill.enabled ? 'bg-primary-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    skill.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <p className="mb-4 text-sm text-gray-300">{skill.description}</p>

            <div className="mb-4 rounded-lg bg-dark-300 p-2">
              <div className="mb-1 text-xs text-gray-400">Install Path</div>
              <div className="font-mono text-xs text-primary-400">{skill.installPath}</div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdate(skill.id)}
                disabled={updatingId === skill.id}
                className="rounded-lg bg-dark-300 p-2 text-gray-400 transition-colors hover:bg-dark-100 hover:text-white"
                title="Update skill"
              >
                <RefreshCw className={`h-4 w-4 ${updatingId === skill.id ? 'animate-spin' : ''}`} />
              </button>
              <button
                className="rounded-lg bg-dark-300 p-2 text-gray-400 transition-colors hover:bg-dark-100 hover:text-white"
                title="Configure"
              >
                <Settings className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleUninstall(skill.id, skill.name)}
                className="rounded-lg bg-dark-300 p-2 text-gray-400 transition-colors hover:bg-red-500/20 hover:text-red-400"
                title="Uninstall"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="rounded-xl border border-gray-800 bg-dark-200 p-12 text-center">
            <Package className="mx-auto mb-3 h-12 w-12 text-gray-600" />
            <p className="mb-2 text-gray-400">No skills installed yet</p>
            <p className="text-sm text-gray-500">Visit Skill Marketplace to install your first skill</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstalledSkills;
