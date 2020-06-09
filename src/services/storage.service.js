class StorageService {
    constructor(models) {
        this.Topic = models.Topic;
    }

    // Save Topics
    storeTopics(topics) {
        return this.Topic.bulkCreate(topics);
    }

    // Get all topics
    getTopics() {
        return this.Topic.findAll();
    }
}

export default StorageService;
