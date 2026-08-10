export interface AnnouncementReport {
  id: string;
  announcementId: string;
  reporterUserId: string;
  reason: 'spam' | 'fraud' | 'inappropriate' | 'prohibited_item' | 'other';
  description?: string;
  status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
  createdAt: string;
  updatedAt: string;
}

const reportsStore: AnnouncementReport[] = [];

export const reportService = {
  createReport: (data: {
    announcementId: string;
    reporterUserId: string;
    reason: AnnouncementReport['reason'];
    description?: string;
  }): AnnouncementReport => {
    const newReport: AnnouncementReport = {
      id: `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      announcementId: data.announcementId,
      reporterUserId: data.reporterUserId,
      reason: data.reason,
      description: data.description || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    reportsStore.push(newReport);
    return newReport;
  },

  getAllReports: (filterStatus?: AnnouncementReport['status']): AnnouncementReport[] => {
    if (filterStatus) {
      return reportsStore.filter((rep) => rep.status === filterStatus);
    }
    return reportsStore;
  },

  getReportById: (id: string): AnnouncementReport | undefined => {
    return reportsStore.find((rep) => rep.id === id);
  },

  updateReportStatus: (
    id: string,
    status: AnnouncementReport['status']
  ): AnnouncementReport | null => {
    const report = reportsStore.find((rep) => rep.id === id);
    if (!report) return null;
    report.status = status;
    report.updatedAt = new Date().toISOString();
    return report;
  },

  getReportCountForAnnouncement: (announcementId: string): number => {
    return reportsStore.filter((rep) => rep.announcementId === announcementId).length;
  },

  clearAll: () => {
    reportsStore.length = 0;
  },
};